package mn.num.saruul.jobBrokerage.payload;

import java.util.List;

import mn.num.saruul.jobBrokerage.models.Education;
import mn.num.saruul.jobBrokerage.models.Experience;
import mn.num.saruul.jobBrokerage.models.Language;
import mn.num.saruul.jobBrokerage.models.Profile;

public class FullDetailPayload {
	private String email;
	private String username;
	private Integer phoneNumber;
	private String givenname;
	private String surname;
	private Profile profile;
	private List<Education> educations;
	private List<Experience> experiences;
	private List<Language> languages;
	
	
	
	public List<Education> getEducations() {
		return educations;
	}
	public void setEducations(List<Education> educations) {
		this.educations = educations;
	}
	public List<Experience> getExperiences() {
		return experiences;
	}
	public void setExperiences(List<Experience> experiences) {
		this.experiences = experiences;
	}
	public List<Language> getLanguages() {
		return languages;
	}
	public void setLanguages(List<Language> languages) {
		this.languages = languages;
	}
	public Profile getProfile() {
		return profile;
	}
	public void setProfile(Profile profile) {
		this.profile = profile;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public Integer getPhoneNumber() {
		return phoneNumber;
	}
	public void setPhoneNumber(Integer phoneNumber) {
		this.phoneNumber = phoneNumber;
	}
	public String getGivenname() {
		return givenname;
	}
	public void setGivenname(String givenname) {
		this.givenname = givenname;
	}
	public String getSurname() {
		return surname;
	}
	public void setSurname(String surname) {
		this.surname = surname;
	}
}
