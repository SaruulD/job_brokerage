package mn.num.saruul.jobBrokerage.controller;

import java.net.URI;
import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import mn.num.saruul.jobBrokerage.models.Company;
import mn.num.saruul.jobBrokerage.models.Job;
import mn.num.saruul.jobBrokerage.models.JobCategory;
import mn.num.saruul.jobBrokerage.models.JobType;
import mn.num.saruul.jobBrokerage.payload.ApiResponse;
import mn.num.saruul.jobBrokerage.payload.JobRequest;
import mn.num.saruul.jobBrokerage.repos.CompanyRepository;
import mn.num.saruul.jobBrokerage.repos.JobCategoryRepository;
import mn.num.saruul.jobBrokerage.repos.JobPostedDateRepository;
import mn.num.saruul.jobBrokerage.repos.JobRepository;
import mn.num.saruul.jobBrokerage.repos.JobTypeRepository;
import mn.num.saruul.jobBrokerage.repos.UserRepository;
import mn.num.saruul.jobBrokerage.security.CurrentUser;
import mn.num.saruul.jobBrokerage.security.UserPrincipal;

@Controller
@RestController
@CrossOrigin
@RequestMapping("/job")
public class JobController {
	
	@Autowired
	JobRepository jobRepository;
	
	@Autowired
	JobCategoryRepository jobCategoryRepository;
	
	@Autowired
	CompanyRepository companyRepository;
	
	@Autowired
	JobTypeRepository jobTypeRepository;
	
	@Autowired
	JobPostedDateRepository jobPostedDateRepository;
	
	@Autowired
	UserRepository userRepository;
	
	@PostMapping("/add")
	public ResponseEntity<?> registerUser(@Valid @RequestBody JobRequest jobRequest) {
		
		Job job = new Job(jobRequest.getJob_title(), jobRequest.getCategory_id(), jobRequest.getJob_type_id(),
				jobRequest.getGender(), jobRequest.getSalary(), jobRequest.isAgeLimit());
		
		Company company = companyRepository.findById(jobRequest.getCompany_id()).orElse(null);
		
		job.setCompany(company);
		
		job.setDescription(jobRequest.getDescription());
		job.setEnabled(true);
		
		if (!jobRequest.isAgeLimit()) {
			job.setAgeDn(null);
			job.setAgeUp(null);
		} else {
			job.setAgeDn(jobRequest.getAgeDn());
			job.setAgeUp(jobRequest.getAgeUp());
		}
		System.out.println(jobRequest.getGender() + " " + jobRequest.getSelectedGender());
		
		
		if (jobRequest.getGender() == false || jobRequest.getGender() == null) {
			job.setGender(null);
		} else {
			if(jobRequest.getSelectedGender() == 0) {
				job.setGender(true);
			}
			else if (jobRequest.getSelectedGender() == 1) {
				job.setGender(false);
			}
		}
		
		Job result = jobRepository.save(job);
		
		URI location = ServletUriComponentsBuilder
				.fromCurrentContextPath().path("/job/{id}")
				.buildAndExpand(result.getId()).toUri();
		
		return ResponseEntity.created(location).body(new ApiResponse(true, "Job added successfully"));
	}
	
	@GetMapping("/categorylist")
	public List<?> getJobCategory() {
		List<?> catList = jobCategoryRepository.findAll();
		return catList;
	}
	
	@GetMapping("/typelist")
	public List<?> getJobType() {
		List<?> catList = jobTypeRepository.findAll();
		return catList;
	}

	@GetMapping("/jobposteddate")
	public List<?> getJobPostedDate() {
		List<?> catList = jobPostedDateRepository.findAll();
		return catList;
	}
	
	@GetMapping("/list")
	public List<?> getAllJobs() {
		List<?> jobList = jobRepository.findAll();
		return jobList;
	}

	@GetMapping("/jobpage")
	public ResponseEntity<Page<Job>> findAll(Pageable pageable) {
		return new ResponseEntity<>(jobRepository.findAll(pageable), HttpStatus.OK);
	}
	
	@GetMapping("/jobbyid/{job_id}")
	public ResponseEntity<Job> findById(@PathVariable(value = "job_id") Long job_id) {
		Job job = jobRepository.findById(job_id).orElse(null);
		return new ResponseEntity<Job>(job, HttpStatus.OK);
	}
	
	@GetMapping("/jobtypebyid/{jobType_id}")
	public ResponseEntity<JobType> findByTypeId(@PathVariable(value = "jobType_id") Integer jobType_id) {
		JobType jobType = jobTypeRepository.findById(jobType_id).orElse(null);
		return new ResponseEntity<JobType>(jobType, HttpStatus.OK);
	}

	@GetMapping("/jobcatbyid/{jobCat_id}")
	public ResponseEntity<JobCategory> findByCatId(@PathVariable(value = "jobCat_id") Integer jobCat_id) {
		JobCategory jobCategory = jobCategoryRepository.findById(jobCat_id).orElse(null);
		return new ResponseEntity<JobCategory>(jobCategory, HttpStatus.OK);
	}
	
	@GetMapping("/search")
	public ResponseEntity<Page<Job>> searchJob(@CurrentUser UserPrincipal currentUser, 
			@RequestParam(value="searchText", required=false) String searchText, @RequestParam(value="catId", required=false) Integer catId,
			@RequestParam(value="typeId", required=false) Integer typeId, @RequestParam(value="dateId", required=false) Integer dateId, Pageable pageable) {
		
		Page<Job> jobList = jobRepository.searchJobs(searchText, catId, typeId, dateId, pageable);
		return new ResponseEntity<>(jobList, HttpStatus.OK);
	}
	
	@GetMapping("/jobbycompany/{company_id}")
	public ResponseEntity<List<Job>> findByCompanyId(@PathVariable(value = "company_id") Long company_id) {
		List<Job> jobList = jobRepository.findByCompanyId(company_id);
		for(Job tmp: jobList) {
			tmp.setReceived_cv(jobRepository.findJobResume(tmp.getId()));
		}
		return new ResponseEntity<List<Job>>(jobList, HttpStatus.OK);
	}
	
	@GetMapping("/jobbycompanycount/{company_id}")
	public ResponseEntity<?> findByCompanyIdCount(@PathVariable(value = "company_id") Long company_id) {
		Integer jobsCount = jobRepository.findByCompanyIdCount(company_id);
		return new ResponseEntity<Integer>(jobsCount, HttpStatus.OK);
	}
	
	@PutMapping("/edit")
	public ResponseEntity<?> editJob(@Valid @RequestBody JobRequest jobRequest, @CurrentUser UserPrincipal currentUser) {
		
		Job job = jobRepository.findById(jobRequest.getId()).orElse(null);
		
//		User user = userRepository.findById(currentUser.getId()).orElse(null);
//			
//		Company company = companyRepository.findById(jobRequest.getCompany_id()).orElse(null);
		
//		if (company.getUser() != user && company.getModerators() != user) {
//			return new ResponseEntity<>("Not authorited", HttpStatus.BAD_REQUEST);
//		}
		
		job.setJob_title(jobRequest.getJob_title());
		job.setCategory_id(jobRequest.getCategory_id());
		job.setJob_type_id(jobRequest.getJob_type_id());
		job.setSalary(jobRequest.getSalary());
		job.setAgeLimit(jobRequest.isAgeLimit());

		if (!jobRequest.isAgeLimit()) {
			job.setAgeDn(null);
			job.setAgeUp(null);
		} else {
			job.setAgeDn(jobRequest.getAgeDn());
			job.setAgeUp(jobRequest.getAgeUp());
		}
		

		if (jobRequest.getGender() == false || jobRequest.getGender() == null) {
			job.setGender(null);
		} else {
			if(jobRequest.getSelectedGender() == 0) {
				job.setGender(true);
			}
			else if (jobRequest.getSelectedGender() == 1) {
				job.setGender(false);
			}
		}
		
		job.setDescription(jobRequest.getDescription());
		job.setEnabled(true);
			
		jobRepository.save(job);
		
		URI location = ServletUriComponentsBuilder
				.fromCurrentContextPath().path("/edit/")
				.buildAndExpand(job.getId()).toUri();
		
		return ResponseEntity.created(location).body(new ApiResponse(true, "Resume updated successfully"));
	}
}
