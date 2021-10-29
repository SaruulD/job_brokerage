package mn.num.saruul.jobBrokerage.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import mn.num.saruul.jobBrokerage.dao.UserDAO;
import mn.num.saruul.jobBrokerage.models.Job;
import mn.num.saruul.jobBrokerage.models.User;
import mn.num.saruul.jobBrokerage.payload.AccountDetails;
import mn.num.saruul.jobBrokerage.repos.JobRepository;
import mn.num.saruul.jobBrokerage.repos.UserRepository;
import mn.num.saruul.jobBrokerage.security.CurrentUser;
import mn.num.saruul.jobBrokerage.security.UserPrincipal;

@Controller
@RestController
@CrossOrigin
@RequestMapping("/user")
public class UserController {

	@Autowired
	UserDAO userDAO;
	
	@Autowired
	UserRepository userRepository;
	
	@Autowired
	JobRepository jobRepository;

	 
	@GetMapping("/myaccount")
	public ResponseEntity<?> getUserData (@CurrentUser UserPrincipal currentUser) {
		
		User user = userDAO.userById(currentUser.getId());
		
		AccountDetails accountDetails = new AccountDetails();
		
		accountDetails.setEmail(user.getEmail());
		accountDetails.setPhoneNumber(user.getPhoneNumber());
		accountDetails.setUsername(user.getUsername());
		accountDetails.setGivenname(user.getGivenname());
		accountDetails.setSurname(user.getSurname());
		
		return new ResponseEntity<>(accountDetails, HttpStatus.OK);
		
	}
	
	@GetMapping("/addtofavlist")
	public ResponseEntity<?> addtofav(@RequestParam(value="jobId") Long jobId, @CurrentUser UserPrincipal currentUser) {
		
		User user = userRepository.findById(currentUser.getId()).orElse(null);
		
		Job job = jobRepository.findById(jobId).orElse(null);
		
		user.getFavJobs().add(job);
		
		userRepository.save(user);
		
		return new ResponseEntity<>("SUCCESS", HttpStatus.OK);
	}
	
	@GetMapping("/removefromfav")
	public ResponseEntity<?> removefromfav(@RequestParam(value="jobId") Long jobId, @CurrentUser UserPrincipal currentUser) {
		
		User user = userRepository.findById(currentUser.getId()).orElse(null);
		
		Job job = jobRepository.findById(jobId).orElse(null);
		
		user.getFavJobs().remove(job);
		
		userRepository.save(user);
		
		return new ResponseEntity<>("SUCCESS", HttpStatus.OK);
	}
	
	@GetMapping("/checkfavlist")
	public ResponseEntity<?> checkfavlist(@RequestParam(value="jobId") Long jobId, @CurrentUser UserPrincipal currentUser) {
		
		User user = userRepository.findById(currentUser.getId()).orElse(null);
		
		Job job = jobRepository.findById(jobId).orElse(null);
		
		Integer count = userRepository.existsInFavList(user.getId(), job.getId());
		
		Boolean exist = count > 0;
		
		return new ResponseEntity<>(exist, HttpStatus.OK);
	}
	
	@GetMapping("/favlist")
	public ResponseEntity<?> favList(@CurrentUser UserPrincipal currentUser) {
		
		User user = userRepository.findById(currentUser.getId()).orElse(null);
		
		List<Job> favList= jobRepository.favList(user.getId());
		
		return new ResponseEntity<>(favList, HttpStatus.OK);
	}
	
}
