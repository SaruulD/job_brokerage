package mn.num.saruul.jobBrokerage.controller;

import java.net.URI;
import java.util.ArrayList;
import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
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
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import mn.num.saruul.jobBrokerage.models.Company;
import mn.num.saruul.jobBrokerage.models.User;
import mn.num.saruul.jobBrokerage.payload.AddCompanyRequest;
import mn.num.saruul.jobBrokerage.payload.ApiResponse;
import mn.num.saruul.jobBrokerage.payload.CompanyPayload;
import mn.num.saruul.jobBrokerage.payload.FileResponse;
import mn.num.saruul.jobBrokerage.repos.CompanyRepository;
import mn.num.saruul.jobBrokerage.repos.JobRepository;
import mn.num.saruul.jobBrokerage.repos.RoleRepository;
import mn.num.saruul.jobBrokerage.repos.UserRepository;
import mn.num.saruul.jobBrokerage.security.CurrentUser;
import mn.num.saruul.jobBrokerage.security.UserPrincipal;
import mn.num.saruul.jobBrokerage.services.FileStorageService;

@Controller
@RestController
@CrossOrigin
@RequestMapping("/company")
public class CompanyController {
	
	@Autowired
	CompanyRepository companyRepository;
	
	@Autowired
	UserRepository userRepository;
	
	@Autowired
	JobRepository jobRepository;
	
	@Autowired
	RoleRepository roleRepository;
	
	@Autowired
    private FileStorageService fileStorageService;
	
//	@PostMapping("/addcompany") 
//	@ResponseStatus(HttpStatus.CREATED)
//	public ResponseEntity<?> addOrUpdateCompany (@RequestBody Company company) {
//		companyDAO.saveOrUpdateCompany(company);
//		return new ResponseEntity<>("Company created succesfully", HttpStatus.OK);
//	}
	
	@PostMapping("/add")
	public ResponseEntity<?> registerUser(@Valid @RequestBody AddCompanyRequest addCompanyRequest, @CurrentUser UserPrincipal currentUser) {
		
		System.out.println(addCompanyRequest);
//		FileResponse file = uploadFile((MultipartFile) addCompanyRequest.getLogo());
		
		User user = userRepository.findById(currentUser.getId()).orElseThrow(() -> 
			new UsernameNotFoundException("User not found with id : " + currentUser.getId()));

		if (!user.isIs_owner()) {
			return new ResponseEntity<>("Not owner", HttpStatus.BAD_REQUEST);
		}
		
		Company company = new Company(addCompanyRequest.getName(), 
				addCompanyRequest.getDescription(), addCompanyRequest.getLocation());
		 
		company.setUser(user);
		
//		company.setLogo(file.getFileName());
		
		company = companyRepository.save(company);
		
		if (company != null) {
			return new ResponseEntity<>(addCompanyRequest, HttpStatus.OK);	
		} else {
			return new ResponseEntity<>("failed", HttpStatus.BAD_REQUEST);	
		}
		
	}
	
    public FileResponse uploadFile(@RequestParam("file")MultipartFile file) {
        String fileName = fileStorageService.storeFile(file);

        String fileDownloadUri = ServletUriComponentsBuilder.fromCurrentContextPath()
            .path("/downloadFile/")
            .path(fileName)
            .toUriString();

        return new FileResponse(fileName, fileDownloadUri,
            file.getContentType(), file.getSize());
    }
    
    @GetMapping("/userscompany")
    public ResponseEntity<?> getUsersCompany(@CurrentUser UserPrincipal currentUser) {
    	
    	User user = userRepository.findById(currentUser.getId()).orElseThrow(() -> 
			new UsernameNotFoundException("User not found with id : " + currentUser.getId())); 
    	
    	List<Company> companies = companyRepository.findCompanyByUserId(user.getId());
    	
    	
    	if(companies == null ) {
			return new ResponseEntity<>("Not authorited", HttpStatus.BAD_REQUEST);	
    	}
    	
    	List<CompanyPayload> comps = new ArrayList<CompanyPayload>(); 
    	for(Company com : companies) {
    		CompanyPayload companyPayload = new CompanyPayload();
    		companyPayload.setReceived_cv(companyRepository.findCompanyResume(com.getId()));
    		companyPayload.setId(com.getId());
    		companyPayload.setName(com.getName());
    		comps.add(companyPayload);
    	}
    	
    	return new ResponseEntity<List<CompanyPayload>>(comps, HttpStatus.OK);
    }
    
    @GetMapping("/companybyid/{company_id}")
	public ResponseEntity<Company> findById(@PathVariable(value = "company_id") Long company_id) {
    	Company company = companyRepository.findById(company_id).orElse(null);
		return new ResponseEntity<Company>(company, HttpStatus.OK);
	}
    
    @DeleteMapping("/delete/{company_id}")
	public ResponseEntity<?> deleteResume(@PathVariable(value = "company_id") Long company_id, @CurrentUser UserPrincipal currentUser) {
		User user = userRepository.findById(currentUser.getId()).orElseThrow(() -> 
			new UsernameNotFoundException("User not found with id : " + currentUser.getId()));
		
		Company company = companyRepository.findById(company_id).orElse(null);
		
		if (!company.getUser().getId().equals( user.getId() )) {
			return new ResponseEntity<>("Not authorited", HttpStatus.BAD_REQUEST);
		}
		
		companyRepository.deleteById(company.getId());

		return new ResponseEntity<>("Successfully deleted", HttpStatus.OK);
		
	}
    
    @GetMapping("/usersearch")
    public ResponseEntity<List<User>> searchUser(@RequestParam(value="searchText") String searchText) {
    	List<User> userList = userRepository.searchUser(searchText);
		return new ResponseEntity<>(userList, HttpStatus.OK);
	}
    
    @GetMapping("/moderatorlist")
    public ResponseEntity<?> moderatorList(@RequestParam(value="companyId") Long companyId) {
    	List<?> moderators = companyRepository.getModerators(companyId);
		return new ResponseEntity<>(moderators, HttpStatus.OK);
	}
    
    @GetMapping("/addmoderator")
    public ResponseEntity<?> addModerator(@RequestParam(value="userId") Long userId, @RequestParam(value="companyId") Long companyId) {
    	User user = userRepository.findById(userId).orElse(null);
    	Company company = companyRepository.findByid(companyId).orElse(null);
    	company.getModerators().add(user);
    	
    	companyRepository.save(company);
		return new ResponseEntity<>("SUCCESS", HttpStatus.OK);
	}
    
    @Transactional
    @DeleteMapping("/removemoderator/{companyId}/{userId}")
	public ResponseEntity<?> removeModerator(@PathVariable(value = "companyId") Long companyId, @PathVariable(value = "userId") Long userId,
			@CurrentUser UserPrincipal currentUser) {
    	
		User user = userRepository.findById(currentUser.getId()).orElseThrow(() -> 
			new UsernameNotFoundException("User not found with id : " + currentUser.getId()));
		
    	Company company = companyRepository.findByid(companyId).orElse(null);
    	
		if (user.getId() != company.getUser().getId()) {
			return new ResponseEntity<>("Not authorited", HttpStatus.BAD_REQUEST);
		}
		
		companyRepository.removeModerator(userId, companyId);
		
		
		return new ResponseEntity<>("Successfully deleted", HttpStatus.OK);
	}
    
    @GetMapping("/checkmod")
    public ResponseEntity<?> checkModerator(@RequestParam(value="userId") Long userId, @RequestParam(value="companyId") Long companyId) {
    	
    	Integer moderator = companyRepository.existsModerator(companyId, userId);
    	Boolean exists;
    	if (moderator > 0) {
    		exists = true;
    	} else {
    		exists = false;
    	}
		return new ResponseEntity<>(exists, HttpStatus.OK);
	}
    
	@PutMapping("/edit")
	public ResponseEntity<?> editResume(@Valid @RequestBody AddCompanyRequest addCompanyRequest, @CurrentUser UserPrincipal currentUser) {
		
		Company company = companyRepository.findById(addCompanyRequest.getId()).orElse(null);
		
		User user = userRepository.findById(currentUser.getId()).orElseThrow(() -> 
		new UsernameNotFoundException("User not found with id : " + currentUser.getId()));
		
		if (!company.getUser().getId().equals( user.getId() )) {
			return new ResponseEntity<>("Not authorited", HttpStatus.BAD_REQUEST);
		}
		
		company.setName(addCompanyRequest.getName());
		company.setLocation(addCompanyRequest.getLocation());
		company.setDescription(addCompanyRequest.getDescription());
		
		companyRepository.save(company);
		
		URI location = ServletUriComponentsBuilder
				.fromCurrentContextPath().path("/edit/")
				.buildAndExpand(company.getId()).toUri();
		
		return ResponseEntity.created(location).body(new ApiResponse(true, "Company updated successfully"));
	}
	
	@GetMapping("/search")
	public ResponseEntity<Page<Company>> searchJob(@RequestParam(value="searchText", required=false) String searchText, Pageable pageable) {
		Page<Company> companyList = companyRepository.searchCompanies(searchText, pageable);
		for(Company tmp: companyList) {
			tmp.setJobCount(jobRepository.findByCompanyIdCount(tmp.getId()));
		}
		return new ResponseEntity<>(companyList, HttpStatus.OK);
	}
	
}
