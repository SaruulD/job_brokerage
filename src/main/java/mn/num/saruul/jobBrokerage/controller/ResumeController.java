package mn.num.saruul.jobBrokerage.controller;

import java.net.URI;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import mn.num.saruul.jobBrokerage.dao.UserDAO;
import mn.num.saruul.jobBrokerage.models.Company;
import mn.num.saruul.jobBrokerage.models.Job;
import mn.num.saruul.jobBrokerage.models.Profile;
import mn.num.saruul.jobBrokerage.models.Resume;
import mn.num.saruul.jobBrokerage.models.SentResumes;
import mn.num.saruul.jobBrokerage.models.User;
import mn.num.saruul.jobBrokerage.payload.ApiResponse;
import mn.num.saruul.jobBrokerage.payload.ResumeRequest;
import mn.num.saruul.jobBrokerage.payload.ResumeResponce;
import mn.num.saruul.jobBrokerage.repos.CompanyRepository;
import mn.num.saruul.jobBrokerage.repos.JobRepository;
import mn.num.saruul.jobBrokerage.repos.ProfileRepository;
import mn.num.saruul.jobBrokerage.repos.ResumeRepository;
import mn.num.saruul.jobBrokerage.repos.SentResumesRepository;
import mn.num.saruul.jobBrokerage.repos.UserRepository;
import mn.num.saruul.jobBrokerage.security.CurrentUser;
import mn.num.saruul.jobBrokerage.security.UserPrincipal;

@Controller
@RestController
@CrossOrigin
@RequestMapping("/resume")
public class ResumeController {
	
	@Autowired
	ResumeRepository resumeRepository;
	
	@Autowired
	UserDAO userDAO;
	
	@Autowired
	UserRepository userRepository;
	
	@Autowired
	ProfileRepository profileRepository;
	
	@Autowired
	CompanyRepository companyRepository;
	
	@Autowired
	JobRepository jobRepository;
	
	@Autowired
	SentResumesRepository sentResumesRepository;
	
	@PostMapping("/add")
	public ResponseEntity<?> createResume(@Valid @RequestBody  ResumeRequest resumeRequest, @CurrentUser UserPrincipal currentUser) {
		
		Resume resume = new Resume();
		
		resume.setResume(resumeRequest.getResume());
		
		User user = userRepository.findById(currentUser.getId()).orElse(null);
		
		resume.setUser(user);
		resume.setName(resumeRequest.getName());
		
		Resume result = resumeRepository.save(resume); 
		
		URI location = ServletUriComponentsBuilder
				.fromCurrentContextPath().path("/resume/{id}")
				.buildAndExpand(result.getId()).toUri();

		return ResponseEntity.created(location).body(new ApiResponse(true, "Resume created successfully"));
	}
	
	@GetMapping("/usersresume")
    public ResponseEntity<?> getUsersCompany(@CurrentUser UserPrincipal currentUser) {
    	
    	User user = userRepository.findById(currentUser.getId()).orElseThrow(() -> 
			new UsernameNotFoundException("User not found with id : " + currentUser.getId())); 
    	Profile profile=null;
    	profile = profileRepository.findByUserId(user.getId()).orElse(profile);
    	
    	if (profile == null) {
    		return new ResponseEntity<>("NO_CONTENT", HttpStatus.OK);
    	}
    	
    	
    	List<Resume> resumes = resumeRepository.findResumeByUserId(user.getId());
    	
    	
    	List<ResumeRequest> resumeList = new ArrayList<ResumeRequest>();
    	if(resumes == null ) {
			return new ResponseEntity<>(resumeList, HttpStatus.OK);
    	}
    	for(Resume resume : resumes) {
    		ResumeRequest resumeRequest = new ResumeRequest();
    		resumeRequest.setId(resume.getId());
    		resumeRequest.setName(resume.getName());

    		resumeRequest.setUpdatedDate(Date.from(resume.getUpdatedAt()));
    		resumeList.add(resumeRequest);
    	}
    	
    	return new ResponseEntity<List<ResumeRequest>>(resumeList, HttpStatus.OK);
    }
	
	@GetMapping("/{resume_id}")
	public ResponseEntity<?> getResumeById(@PathVariable(value = "resume_id") Long resume_id, @CurrentUser UserPrincipal currentUser) {
		User user = userRepository.findById(currentUser.getId()).orElseThrow(() -> 
			new UsernameNotFoundException("User not found with id : " + currentUser.getId()));
		
		Resume resume = resumeRepository.findById(resume_id).orElseThrow(() -> 
			new UsernameNotFoundException("Resume not found with id : " + resume_id));

		if (user.getId() != Long.valueOf(resume.getUser().getId() )) {
			return new ResponseEntity<>("Not authorited", HttpStatus.BAD_REQUEST);	
		}
		
		// currentUser ( Company ) seeing resume permission
		
		ResumeResponce response = new ResumeResponce();
		response.setResume(resume.getResume());
		response.setName(resume.getName());
		
		return new ResponseEntity<ResumeResponce>(response, HttpStatus.OK);
	}
	
	@PutMapping("/edit")
	public ResponseEntity<?> editResume(@Valid @RequestBody  ResumeRequest resumeRequest, @CurrentUser UserPrincipal currentUser) {
		
		Resume resume = resumeRepository.findById(resumeRequest.getId()).orElseThrow(() -> 
		new UsernameNotFoundException("Resume not found with id : " + resumeRequest.getId()));
		
		
		resume.setResume(resumeRequest.getResume());
		
		User user = userDAO.userById(currentUser.getId());
		
		if (!resume.getUser().getId().equals( user.getId() )) {
			return new ResponseEntity<>("Not authorited", HttpStatus.BAD_REQUEST);
		}
		
		resume.setName(resumeRequest.getName());
		resume.setResume(resumeRequest.getResume());
		
		resumeRepository.save(resume);
		
		URI location = ServletUriComponentsBuilder
				.fromCurrentContextPath().path("/edit/")
				.buildAndExpand(resume.getId()).toUri();
		
		return ResponseEntity.created(location).body(new ApiResponse(true, "Resume updated successfully"));
	}
	
	@DeleteMapping("/delete/{resume_id}")
	public ResponseEntity<?> deleteResume(@PathVariable(value = "resume_id") Long resume_id, @CurrentUser UserPrincipal currentUser) {
		User user = userRepository.findById(currentUser.getId()).orElseThrow(() -> 
			new UsernameNotFoundException("User not found with id : " + currentUser.getId()));
		
		Resume resume = resumeRepository.findById(resume_id).orElseThrow(() -> 
		new UsernameNotFoundException("Resume not found with id : " + resume_id));
		
		if (!resume.getUser().getId().equals( user.getId() )) {
			return new ResponseEntity<>("Not authorited", HttpStatus.BAD_REQUEST);
		}
		
		resumeRepository.deleteById(resume.getId());
		
		return new ResponseEntity<>("Successfully deleted", HttpStatus.OK);
	}
	
	@GetMapping("/sendresume")
	public ResponseEntity<?> sendResume(@RequestParam(value="resumeId") Long resumeId, 
			@RequestParam(value="jobId") Long jobId, @CurrentUser UserPrincipal currentUser) {
		
		User user = userRepository.findById(currentUser.getId()).orElse(null);
		
		Job job = jobRepository.findById(jobId).orElse(null);
		
		Resume resume = resumeRepository.findById(resumeId).orElse(null);
		
		if (!resume.getUser().getId().equals( user.getId() )) {
			return new ResponseEntity<>("Not authorited", HttpStatus.BAD_REQUEST);
		}
		SentResumes sentResumes = new SentResumes(job.getId(), resume.getName(), resume.getResume(), user);
		try {
			sentResumesRepository.save(sentResumes);
		}catch( Exception e) {
			if( e.getMessage().contains("constraint")) {
				return new ResponseEntity<>("DUPLICATED", HttpStatus.OK);
			}
	    	return new ResponseEntity<>("FAILED", HttpStatus.OK);
	    }
		return new ResponseEntity<>("SUCCESS", HttpStatus.OK);
	}
	
	@GetMapping("/jobresumes/{job_id}")
	public ResponseEntity<?> companyResumes(@PathVariable(value = "job_id") Long job_id, @CurrentUser UserPrincipal currentUser) {
		
		User user = userRepository.findById(currentUser.getId()).orElseThrow(() -> 
		new UsernameNotFoundException("User not found with id : " + currentUser.getId()));
		
		Company company = companyRepository.findCompanyByJob(job_id).orElse(null);
		
		Integer exists = companyRepository.existsModerator(company.getId(), user.getId());
		
		if (company.getUser().getId().equals(user.getId())) {
			
		} else if (exists <= 0) {
			return new ResponseEntity<>("Not authorited", HttpStatus.BAD_REQUEST);
		}
		
		List<?> resumesList = jobRepository.jobResumes(job_id);
		return new ResponseEntity<>(resumesList, HttpStatus.OK);
	}
	
	@GetMapping("/viewreceived/{resume_id}")
	public ResponseEntity<?> viewReceivedResumes(@PathVariable(value = "resume_id") Long resume_id, @CurrentUser UserPrincipal currentUser) {
		
		User user = userRepository.findById(currentUser.getId()).orElseThrow(() -> 
		new UsernameNotFoundException("User not found with id : " + currentUser.getId()));
		
		SentResumes resume = sentResumesRepository.findById(resume_id).orElse(null);
		
		Company company = companyRepository.findCompanyByJob(resume.getJob_id()).orElse(null);
		
		Integer exists = companyRepository.existsModerator(company.getId(), user.getId());
		
		if (exists <= 0) {
			return new ResponseEntity<>("Not authorited", HttpStatus.BAD_REQUEST);
		}
		return new ResponseEntity<>(resume, HttpStatus.OK);
	}
}
