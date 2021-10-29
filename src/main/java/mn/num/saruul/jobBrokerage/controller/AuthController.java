package mn.num.saruul.jobBrokerage.controller;

import java.util.Collections;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import mn.num.saruul.jobBrokerage.exception.AppException;
import mn.num.saruul.jobBrokerage.models.Role;
import mn.num.saruul.jobBrokerage.models.RoleName;
import mn.num.saruul.jobBrokerage.models.User;
import mn.num.saruul.jobBrokerage.payload.ApiResponse;
import mn.num.saruul.jobBrokerage.payload.JwtAuthenticationResponse;
import mn.num.saruul.jobBrokerage.payload.LoginRequest;
import mn.num.saruul.jobBrokerage.payload.SignUpRequest;
import mn.num.saruul.jobBrokerage.repos.RoleRepository;
import mn.num.saruul.jobBrokerage.repos.UserRepository;
import mn.num.saruul.jobBrokerage.security.JwtTokenProvider;

@Controller
@RestController
@CrossOrigin
@RequestMapping("/auth")
public class AuthController {
	
	@Autowired
	UserRepository userRepository;
	
	@Autowired
	PasswordEncoder passwordEncoder;
	
	@Autowired
	RoleRepository roleRepository;
	
	@Autowired
	JwtTokenProvider tokenProvider;
	
	@Autowired
	AuthenticationManager authenticationManager;
	
	
	@SuppressWarnings({ "unchecked", "rawtypes" })
	@PostMapping("/signup")
	public ResponseEntity<?> registerUser(@Valid @RequestBody SignUpRequest signUpRequest, BindingResult bindingResults) {
		
		if(bindingResults.hasErrors()) {
			String errorMessages="";
			for(FieldError error:bindingResults.getFieldErrors()) {
				errorMessages+=error.getField()+":"+error.getDefaultMessage()+",";
			}
			return new ResponseEntity(new ApiResponse(false, errorMessages ), HttpStatus.BAD_REQUEST);
		}
		if (userRepository.existsByUsername(signUpRequest.getUsername())) {
			return new ResponseEntity(new ApiResponse(false, "Username is already taken!"), HttpStatus.BAD_REQUEST);
		}
		
		if (userRepository.existsByEmail(signUpRequest.getEmail())) {
			return new ResponseEntity(new ApiResponse(false, "Email Address already in use!"), HttpStatus.BAD_REQUEST); 
		}
		
		
		User user = new User(signUpRequest.getSurname(), signUpRequest.getGivenname(), signUpRequest.getUsername(), 
				signUpRequest.getEmail(), signUpRequest.getPassword(), signUpRequest.isIs_owner(), signUpRequest.getPhoneNumber());
		
		user.setPassword(passwordEncoder.encode(user.getPassword()));
		
		Role userRole;
		
		if(signUpRequest.isIs_owner()) {
			userRole = roleRepository.findByName(RoleName.ROLE_OWNER)
					.orElseThrow(() -> new AppException("User Role not set."));
		} else {
			userRole = roleRepository.findByName(RoleName.ROLE_USER)
					.orElseThrow(() -> new AppException("User Role not set."));
		}
		
		
		user.setRoles(Collections.singleton(userRole));
		
		User result = userRepository.save(user);
//		URI location = ServletUriComponentsBuilder
//				.fromCurrentContextPath().path("/api/users/{username}")
//				.buildAndExpand(result.getUsername()).toUri();
		if( result.getId().equals(null) ) {
			return new ResponseEntity<>("LOGIN_FAIL", HttpStatus.OK);
		}
		Authentication authentication = authenticationManager.authenticate(
				new UsernamePasswordAuthenticationToken(
						result.getUsername(), 
						signUpRequest.getPassword()
				)
		);
		
		SecurityContextHolder.getContext().setAuthentication(authentication);
		
		String jwt = tokenProvider.generateToken(authentication);
		System.out.println(jwt);
		
        return ResponseEntity.ok(new JwtAuthenticationResponse(jwt));
	}
	
	@PostMapping("/signin")
	public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {
		
		Authentication authentication = authenticationManager.authenticate(
				new UsernamePasswordAuthenticationToken(
						loginRequest.getUsernameOrEmail(), 
						loginRequest.getPassword()
				)
		);
		
		SecurityContextHolder.getContext().setAuthentication(authentication);
		
		String jwt = tokenProvider.generateToken(authentication);
		
		JwtAuthenticationResponse jwtAuthenticationResponse = new JwtAuthenticationResponse(jwt);
		
		String username = authentication.getName();

		User user = userRepository.findByUsername(username).orElseThrow(() -> 
			new UsernameNotFoundException("User not found with username : " + username));
		
		for(Role role: user.getRoles()) {
			jwtAuthenticationResponse.addElementToRoles(role.getId());
		}
		
		
        return ResponseEntity.ok(jwtAuthenticationResponse);
	}
}
