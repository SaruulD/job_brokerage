package mn.num.saruul.jobBrokerage.models;

import java.util.HashSet;
import java.util.Set;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.Transient;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

import mn.num.saruul.jobBrokerage.models.audit.UserDateAudit;

@Entity
@Table(name = "companies")
public class Company extends UserDateAudit {
	private static final long serialVersionUID = 1L;
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@NotBlank
	@Size(min = 2, max = 60)
	private String name;
	
	@NotBlank
	@Size(min = 2, max = 256)
	private String description;
	
	private String logo;
	
	@Size(max = 256)
	private String location;
	
	@ManyToOne
	@JoinColumn(name="owner_id", nullable = false)
	private User user;
	
	@ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(name = "company_moderators",
            joinColumns = @JoinColumn(name = "company_id"),
            inverseJoinColumns = @JoinColumn(name = "user_id"))
    private Set<User> moderators = new HashSet<>();
	
	@ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(name = "company_resumes",
            joinColumns = @JoinColumn(name = "company_id"),
            inverseJoinColumns = @JoinColumn(name = "resume_id")) 
    private Set<Resume> received_resumes = new HashSet<>();
	
	@Transient
	private Integer resumeCount;
	
	// non persistence
	@Transient
	private Integer jobCount;
	
	
	public Integer getResumeCount() {
		return resumeCount;
	}
	public void setResumeCount(Integer resumeCount) {
		this.resumeCount = resumeCount;
	}
	public Integer getJobCount() {
		return jobCount;
	}
	public void setJobCount(Integer jobCount) {
		this.jobCount = jobCount;
	}
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public String getLocation() {
		return location;
	}
	public void setLocation(String location) {
		this.location = location;
	}
	public String getLogo() {
		return logo;
	}
	public void setLogo(String logo) {
		this.logo = logo;
	}
	public User getUser() {
		return user;
	}
	public void setUser(User user) {
		this.user = user;
	}
	public Company(@NotBlank @Size(min = 2, max = 60) String name,
			@NotBlank @Size(min = 2, max = 256) String description, @Size(max = 256) String location) {
		super();
		this.name = name;
		this.description = description;
		this.location = location;
	}
	
	public Set<User> getModerators() {
		return moderators;
	}
	public void setModerators(Set<User> moderators) {
		this.moderators = moderators;
	}
	public Company() {
	}
	public Set<Resume> getReceived_resumes() {
		return received_resumes;
	}
	public void setReceived_resumes(Set<Resume> received_resumes) {
		this.received_resumes = received_resumes;
	}
	@Override
	public String toString() {
		return "Company [id=" + id + ", name=" + name + ", description=" + description + ", logo=" + logo
				+ ", location=" + location + ", user=" + user + ", moderators=" + moderators + ", received_resumes="
				+ received_resumes + "]";
	}
	
}
