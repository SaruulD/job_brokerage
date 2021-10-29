package mn.num.saruul.jobBrokerage.models;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.Transient;
import javax.validation.constraints.NotNull;

import org.springframework.data.annotation.CreatedDate;

import com.fasterxml.jackson.annotation.JsonFormat;

import mn.num.saruul.jobBrokerage.models.audit.UserDateAudit;

@Entity
@Table(name = "jobs")
public class Job extends UserDateAudit {
	private static final long serialVersionUID = 1L;
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	@NotNull
	private String job_title;
	private Integer category_id;
	private Integer job_type_id;
	private Boolean gender;
	private boolean ageLimit;
	private Integer ageUp;
	private Integer ageDn;
	private String salary;
	private Boolean enabled;
	//private Date expiredDate;
//	@Lob
	private String description;
	@CreatedDate
    @Column(nullable = false, updatable = false)
	@JsonFormat(pattern="yyyy-MM-dd")
	private Date createdDate;
	private Integer count;
	 
	@ManyToOne
	@JoinColumn(name="company_id", nullable = false)
	private Company company;
	
	@Transient
	private Integer received_cv;
	
	
	
	 
	
	public Integer getReceived_cv() {
		return received_cv;
	}


	public void setReceived_cv(Integer received_cv) {
		this.received_cv = received_cv;
	}


	public Company getCompany() {
		return company;
	}


	public void setCompany(Company company) {
		this.company = company;
	}


	public Long getId() {
		return id;
	}


	public void setId(Long id) {
		this.id = id;
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


	public boolean isAgeLimit() {
		return ageLimit;
	}


	public void setAgeLimit(boolean ageLimit) {
		this.ageLimit = ageLimit;
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


	public Boolean getEnabled() {
		return enabled;
	}


	public void setEnabled(Boolean enabled) {
		this.enabled = enabled;
	}


	public String getDescription() {
		return description;
	}


	public void setDescription(String description) {
		this.description = description;
	}


	public Date getCreatedDate() {
		return createdDate;
	}


	public void setCreatedDate(Date createdDate) {
		this.createdDate = createdDate;
	}


	public Integer getCount() {
		return count;
	}


	public void setCount(Integer count) {
		this.count = count;
	}


	public Job(@NotNull String job_title, Integer category_id, Integer job_type_id, Boolean gender, String salary, boolean ageLimit) {
		this.job_title = job_title;
		this.category_id = category_id;
		this.job_type_id = job_type_id;
		this.gender = gender;
		this.salary = salary;
		this.ageLimit = ageLimit;
	}


	public Job() {
		super();
	}
	
	
	
}
