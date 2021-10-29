package mn.num.saruul.jobBrokerage.payload;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

public class JobRequest {
	private Long id;
	
	@NotBlank
	@Size(min = 2, max = 50)
	private String job_title;
	
	@NotNull
	private Long company_id;
	
	@NotNull
	private Integer category_id;
	
	@NotNull
	private Integer job_type_id;
	
	private Boolean gender;
	
	private Integer selectedGender;
	
	private boolean ageLimit;
	
	private Integer ageUp;
	
	private Integer ageDn;
	
	private String salary;
	
	private String description;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Long getCompany_id() {
		return company_id;
	}

	public void setCompany_id(Long company_id) {
		this.company_id = company_id;
	}

	public String getJob_title() {
		return job_title;
	}

	public void setJob_title(String job_title) {
		this.job_title = job_title;
	}

	public Integer getCategory_id() {
		return category_id;
	}

	public void setCategory_id(Integer category_id) {
		this.category_id = category_id;
	}

	public Integer getJob_type_id() {
		return job_type_id;
	}

	public void setJob_type_id(Integer job_type_id) {
		this.job_type_id = job_type_id;
	}

	public Boolean getGender() {
		return gender;
	}

	public void setGender(Boolean gender) {
		this.gender = gender;
	}

	public Integer getAgeUp() {
		return ageUp;
	}

	public void setAgeUp(Integer ageUp) {
		this.ageUp = ageUp;
	}

	public Integer getAgeDn() {
		return ageDn;
	}

	public void setAgeDn(Integer ageDn) {
		this.ageDn = ageDn;
	}

	public String getSalary() {
		return salary;
	}

	public void setSalary(String salary) {
		this.salary = salary;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public boolean isAgeLimit() {
		return ageLimit;
	}

	public void setAgeLimit(boolean ageLimit) {
		this.ageLimit = ageLimit;
	}

	public Integer getSelectedGender() {
		return selectedGender;
	}

	public void setSelectedGender(Integer selectedGender) {
		this.selectedGender = selectedGender;
	}

	
}
