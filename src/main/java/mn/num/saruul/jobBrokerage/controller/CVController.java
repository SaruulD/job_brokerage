package mn.num.saruul.jobBrokerage.controller;

import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import mn.num.saruul.jobBrokerage.dao.UserDAO;
import mn.num.saruul.jobBrokerage.models.Education;
import mn.num.saruul.jobBrokerage.models.Experience;
import mn.num.saruul.jobBrokerage.models.Language;
import mn.num.saruul.jobBrokerage.models.User;
import mn.num.saruul.jobBrokerage.repos.EducationRepository;
import mn.num.saruul.jobBrokerage.repos.ExperienceRepository;
import mn.num.saruul.jobBrokerage.repos.LanguageRepository;
import mn.num.saruul.jobBrokerage.security.CurrentUser;
import mn.num.saruul.jobBrokerage.security.UserPrincipal;

@Controller
@RestController
@CrossOrigin
@RequestMapping("/cv")
public class CVController {
	
	@Autowired
	UserDAO userDAO; 
	
	@Autowired
	EducationRepository educationRepository;
	
	@Autowired
	LanguageRepository languageRepository;
	
	@Autowired
	ExperienceRepository experienceRepository;
	
	@PostMapping("/addedu")
	public ResponseEntity<?> addEdu(@Valid @RequestBody  Education education, @CurrentUser UserPrincipal currentUser) {
		

		User user = userDAO.userById(currentUser.getId());
		education.setUser(user);
		
		education= educationRepository.save(education);
		
		
		return new ResponseEntity<Education>(education, HttpStatus.OK);
	}
	
	@GetMapping("/listedu")
	public ResponseEntity<?> listEdu(@CurrentUser UserPrincipal currentUser) {
		
		User user = userDAO.userById(currentUser.getId());
		
		List<Education> educationsList =  educationRepository.findAllEducation(user.getId());
		
		return new ResponseEntity<List<Education>>(educationsList, HttpStatus.OK);
	}
	
	@DeleteMapping("/deleteedu/{edu_id}")
	public ResponseEntity<?> deleteEdu(@PathVariable(value = "edu_id") Long edu_id, @CurrentUser UserPrincipal currentUser) {

		User user = userDAO.userById(currentUser.getId());
		
		Education education = educationRepository.findById(edu_id).orElse(null);
		
		if (education == null) {
			return new ResponseEntity<>("NO_CONTENT", HttpStatus.BAD_REQUEST);
		}
		
		if (!education.getUser().getId().equals(user.getId())) {
			return new ResponseEntity<>("Not authorited", HttpStatus.BAD_REQUEST);
		}
		
		try {
			educationRepository.deleteById(edu_id);
			return new ResponseEntity<Long>(edu_id, HttpStatus.OK);
		} catch(Exception e) {
			return new ResponseEntity<String>("Error", HttpStatus.BAD_REQUEST);
		}
	}
	
	@PutMapping("/editedu")
	public ResponseEntity<?> editResume(@Valid @RequestBody  Education education, @CurrentUser UserPrincipal currentUser) {
		
		
		Education oldEducation = educationRepository.findById(education.getId()).orElse(null); 

		User user = userDAO.userById(currentUser.getId());
		if (oldEducation == null) {
			return new ResponseEntity<>("NO_CONTENT", HttpStatus.BAD_REQUEST);
		}
		
		if (!oldEducation.getUser().getId().equals(user.getId())) {
			return new ResponseEntity<>("Not authorited", HttpStatus.BAD_REQUEST);
		}
		oldEducation.setDegree(education.getDegree());
		oldEducation.setEndAt(education.getEndAt());
		oldEducation.setStartAt(education.getStartAt());
		oldEducation.setProfession(education.getProfession());
		oldEducation.setSchoolName(education.getSchoolName());
		
		education = educationRepository.save(oldEducation);
		
		return new ResponseEntity<Education>(education, HttpStatus.OK);
	}
	
// Language 
	 
	@PostMapping("/addlang")
	public ResponseEntity<?> addLang(@Valid @RequestBody Language language, @CurrentUser UserPrincipal currentUser) {
		

		User user = userDAO.userById(currentUser.getId());
		language.setUser(user);
		
		try {
			language = languageRepository.save(language);
		}catch( Exception e) {
			return new ResponseEntity<String>(e.getMessage(), HttpStatus.BAD_REQUEST);
		}
		
		
		return new ResponseEntity<Language>(language, HttpStatus.OK);
	}
	
	@GetMapping("/listlang")
	public ResponseEntity<?> listLang(@CurrentUser UserPrincipal currentUser) {
		
		User user = userDAO.userById(currentUser.getId());
		
		List<Language> languageList = languageRepository.findAllLanguages(user.getId());
		
		return new ResponseEntity<List<Language>>(languageList, HttpStatus.OK);
	}
	
	@DeleteMapping("/deletelang/{lang_id}")
	public ResponseEntity<?> deleteLang(@PathVariable(value = "lang_id") Long lang_id, @CurrentUser UserPrincipal currentUser) {

		User user = userDAO.userById(currentUser.getId());
		
		Language language = languageRepository.findById(lang_id).orElse(null);
		
		if (language == null) {
			return new ResponseEntity<>("NO_CONTENT", HttpStatus.BAD_REQUEST);
		}
		
		if (!language.getUser().getId().equals(user.getId())) {
			return new ResponseEntity<>("Not authorited", HttpStatus.BAD_REQUEST);
		}
		
		try {
			languageRepository.deleteById(lang_id);
			return new ResponseEntity<Long>(lang_id, HttpStatus.OK);
		} catch(Exception e) {
			return new ResponseEntity<String>("Error", HttpStatus.BAD_REQUEST);
		}
	}
	
	@PutMapping("/editlang")
	public ResponseEntity<?> editLang(@Valid @RequestBody Language language, @CurrentUser UserPrincipal currentUser) {
		
		
		Language oldLanguage = languageRepository.findById(language.getId()).orElse(null); 

		User user = userDAO.userById(currentUser.getId());
		if (oldLanguage == null) {
			return new ResponseEntity<>("NO_CONTENT", HttpStatus.BAD_REQUEST);
		}
		
		if (!oldLanguage.getUser().getId().equals(user.getId())) {
			return new ResponseEntity<>("Not authorited", HttpStatus.BAD_REQUEST);
		}
		
		oldLanguage.setListening(language.getListening());
		oldLanguage.setReading(language.getReading());
		oldLanguage.setSpeaking(language.getSpeaking());
		oldLanguage.setWriting(language.getWriting());
		oldLanguage.setName(language.getName());
		
		language = languageRepository.save(oldLanguage);
		
		return new ResponseEntity<Language>(language, HttpStatus.OK);
	}
	
	@PostMapping("/addexp")
	public ResponseEntity<?> addExp(@Valid @RequestBody Experience experience, @CurrentUser UserPrincipal currentUser) {
		
		User user = userDAO.userById(currentUser.getId());
		experience.setUser(user);
		
		experience = experienceRepository.save(experience);
		System.out.println(experience.getInstitute());
		
		return new ResponseEntity<Experience>(experience, HttpStatus.OK);
	}
	
	@GetMapping("/listexp")
	public ResponseEntity<?> listExp(@CurrentUser UserPrincipal currentUser) {
		
		User user = userDAO.userById(currentUser.getId());
		
		List<Experience> experienceList = experienceRepository.findAllExperiences(user.getId());
		
		return new ResponseEntity<List<Experience>>(experienceList, HttpStatus.OK);
	}
	
	@DeleteMapping("/deleteexp/{exp_id}")
	public ResponseEntity<?> deleteExp(@PathVariable(value = "exp_id") Long exp_id, @CurrentUser UserPrincipal currentUser) {

		User user = userDAO.userById(currentUser.getId());
		
		Experience experience = experienceRepository.findById(exp_id).orElse(null);
		
		if (experience == null) {
			return new ResponseEntity<>("NO_CONTENT", HttpStatus.BAD_REQUEST);
		}
		
		if (!experience.getUser().getId().equals(user.getId())) {
			return new ResponseEntity<>("Not authorited", HttpStatus.BAD_REQUEST);
		}
		
		try {
			experienceRepository.deleteById(exp_id);
			return new ResponseEntity<Long>(exp_id, HttpStatus.OK);
		} catch(Exception e) {
			return new ResponseEntity<String>("Error", HttpStatus.BAD_REQUEST);
		}
	}
	
	@PutMapping("/editexp")
	public ResponseEntity<?> editExp(@Valid @RequestBody Experience experience, @CurrentUser UserPrincipal currentUser) {
		
		
		Experience oldExperience = experienceRepository.findById(experience.getId()).orElse(null); 

		User user = userDAO.userById(currentUser.getId());
		if (oldExperience == null) {
			return new ResponseEntity<>("NO_CONTENT", HttpStatus.BAD_REQUEST);
		}
		
		if (!oldExperience.getUser().getId().equals(user.getId())) {
			return new ResponseEntity<>("Not authorited", HttpStatus.BAD_REQUEST);
		}
		
		oldExperience.setInstitute(experience.getInstitute());
		oldExperience.setPosition(experience.getPosition());
		oldExperience.setStartAt(experience.getStartAt());
		oldExperience.setEndAt(experience.getEndAt());
		
		experience = experienceRepository.save(oldExperience);
		
		return new ResponseEntity<Experience>(experience, HttpStatus.OK);
	}
}
