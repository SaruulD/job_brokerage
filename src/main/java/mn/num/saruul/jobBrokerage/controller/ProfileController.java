package mn.num.saruul.jobBrokerage.controller;

import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import mn.num.saruul.jobBrokerage.models.Aimag;
import mn.num.saruul.jobBrokerage.models.Profile;
import mn.num.saruul.jobBrokerage.models.Sum;
import mn.num.saruul.jobBrokerage.models.User;
import mn.num.saruul.jobBrokerage.payload.FullDetailPayload;
import mn.num.saruul.jobBrokerage.payload.ProfileRequest;
import mn.num.saruul.jobBrokerage.repos.AimagRepository;
import mn.num.saruul.jobBrokerage.repos.EducationRepository;
import mn.num.saruul.jobBrokerage.repos.ExperienceRepository;
import mn.num.saruul.jobBrokerage.repos.LanguageRepository;
import mn.num.saruul.jobBrokerage.repos.ProfileRepository;
import mn.num.saruul.jobBrokerage.repos.SumRepository;
import mn.num.saruul.jobBrokerage.repos.UserRepository;
import mn.num.saruul.jobBrokerage.security.CurrentUser;
import mn.num.saruul.jobBrokerage.security.UserPrincipal;

@Controller
@RestController
@CrossOrigin
@RequestMapping("/profile")
public class ProfileController {

	@Autowired
	ProfileRepository profileRepository;
	
	@Autowired
	UserRepository userRepository;
	
	@Autowired
	AimagRepository aimagRepository;
	
	@Autowired
	SumRepository sumRepository;
	
	@PostMapping("/add")
	public ResponseEntity<?> registerUser(@RequestBody ProfileRequest profileRequest, @CurrentUser UserPrincipal currentUser) {
		
		
		User user = userRepository.findById(currentUser.getId()).orElseThrow(() -> 
		new UsernameNotFoundException("User not found with id : " + currentUser.getId()));
		
		Aimag birth_aimag = aimagRepository.findById(profileRequest.getBirthAimag()).orElse(null);
		Sum birth_sum = sumRepository.findById(profileRequest.getBirthSum()).orElse(null);
		Aimag resident_aimag = aimagRepository.findById(profileRequest.getResidentAimag()).orElse(null);
		Sum resident_sum = sumRepository.findById(profileRequest.getResidentSum()).orElse(null);
		
		Profile profile = new Profile(profileRequest.getRace(), profileRequest.getBirthdate(), profileRequest.getFamilyName(), birth_aimag,
				birth_sum, profileRequest.getBirthAddress(), resident_aimag, 
				resident_sum, profileRequest.getResidentAddress());
		
		profile.setUser(user);
		 
		if (profileRequest.getGender() == 0) {
			// eregtei
			profile.setGender(true);
		} else if (profileRequest.getGender() == 1) {
			// emegtei
			profile.setGender(false);
		} else if (profileRequest.getGender() == 2) {
			// busad
			profile.setGender(null);
		}
		
		Profile result = profileRepository.save(profile);
		
		return new ResponseEntity<Profile>(result, HttpStatus.OK);
	}
	
	@GetMapping("/profile")
	public ResponseEntity<?> getProfileById(@CurrentUser UserPrincipal currentUser) {
		
		User user = userRepository.findById(currentUser.getId()).orElseThrow(() -> 
			new UsernameNotFoundException("User not found with id : " + currentUser.getId()));
		
		Profile profile = profileRepository.findByUserId(user.getId()).orElse(null);
		
		if (profile == null) {
    		return new ResponseEntity<>("NO_CONTENT", HttpStatus.OK);
    	}

		if (user.getId() != Long.valueOf(profile.getUser().getId() )) {
			return new ResponseEntity<>("Not authorited", HttpStatus.BAD_REQUEST);	
		}
		
		return new ResponseEntity<Profile>(profile, HttpStatus.OK);
	}
	
	@Autowired
	EducationRepository eduRepo;
	@Autowired
	ExperienceRepository expRepo;
	@Autowired
	LanguageRepository langRepo;
	
	@GetMapping("/fulldetail")
	public ResponseEntity<?> getProfileById_1(@CurrentUser UserPrincipal currentUser) {
		
		User user = userRepository.findById(currentUser.getId()).orElseThrow(() -> 
			new UsernameNotFoundException("User not found with id : " + currentUser.getId()));
		
		Profile profile = profileRepository.findByUserId(user.getId()).orElse(null);
		
		
		if (profile == null) {
    		return new ResponseEntity<>("NO_CONTENT", HttpStatus.OK);
    	}

		if (user.getId() != Long.valueOf(profile.getUser().getId() )) {
			return new ResponseEntity<>("Not authorited", HttpStatus.BAD_REQUEST);	
		}
		
		FullDetailPayload detail = new FullDetailPayload();
		
		detail.setEmail(user.getEmail());
		detail.setPhoneNumber(user.getPhoneNumber());
		detail.setUsername(user.getUsername());
		detail.setGivenname(user.getGivenname());
		detail.setSurname(user.getSurname());
		
		detail.setEducations( eduRepo.findAllEducation(user.getId()) );
		detail.setExperiences( expRepo.findAllExperiences(user.getId()));
		detail.setLanguages(langRepo.findAllLanguages(user.getId()));
		
		detail.setProfile(profile);
		
		return new ResponseEntity<>(detail, HttpStatus.OK);
	}
	
	
	@GetMapping("/aimag")
	public ResponseEntity<?> getAllAimag() {
		
		List<Aimag> aimags = aimagRepository.findAll();
		
		return new ResponseEntity<List<Aimag>>(aimags, HttpStatus.OK);
	}
	
	@GetMapping("/sum_url/{aimag_id}")
	public ResponseEntity<?> getAllSumByAimag(@PathVariable(value = "aimag_id") Long aimag_id) {
		
		List<Sum> sums = sumRepository.findByAimagId(aimag_id);
		
		return new ResponseEntity<List<Sum>>(sums, HttpStatus.OK);
	}
	
	@PutMapping("/edit")
	public ResponseEntity<?> editProfile(@Valid @RequestBody ProfileRequest profileRequest, @CurrentUser UserPrincipal currentUser) {
		
		Profile profile = profileRepository.findById(profileRequest.getId()).orElse(null);
		
		User user = userRepository.findById(currentUser.getId()).orElseThrow(() -> 
		new UsernameNotFoundException("User not found with id : " + currentUser.getId()));
		
		if (!profile.getUser().getId().equals(user.getId())) {
			return new ResponseEntity<>("Not authorized.", HttpStatus.BAD_REQUEST);
		}
		
		Aimag birth_aimag = aimagRepository.findById(profileRequest.getBirthAimag()).orElse(null);
		Sum birth_sum = sumRepository.findById(profileRequest.getBirthSum()).orElse(null);
		Aimag resident_aimag = aimagRepository.findById(profileRequest.getResidentAimag()).orElse(null);
		Sum resident_sum = sumRepository.findById(profileRequest.getResidentSum()).orElse(null);
		
		profile = new Profile(profileRequest.getRace(), profileRequest.getBirthdate(), profileRequest.getFamilyName(), birth_aimag,
				birth_sum, profileRequest.getBirthAddress(), resident_aimag, 
				resident_sum, profileRequest.getResidentAddress());
		
		if (profileRequest.getGender() == 0) {
			// eregtei
			profile.setGender(true);
		} else if (profileRequest.getGender() == 1) {
			// emegtei
			profile.setGender(false);
		} else if (profileRequest.getGender() == 2) {
			// busad
			profile.setGender(null);
		}
		
		profile.setId(profileRequest.getId());
		
		profile.setUser(user);
		
		profile = profileRepository.save(profile);
		
		return new ResponseEntity<Profile>(profile, HttpStatus.OK);
	}
	
}
