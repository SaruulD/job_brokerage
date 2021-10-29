package mn.num.saruul.jobBrokerage.models;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;
import javax.validation.constraints.NotNull;

@Entity
@Table(name = "sent_resumes", uniqueConstraints = {
        @UniqueConstraint(columnNames = {
                "job_id",
                "user_id"
        })
})
public class SentResumes {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	Long id;
	@NotNull
	private Long job_id;
	
	private String resume_name;
//	@Lob
	private String resume;
	
	@ManyToOne
	@JoinColumn(name="user_id", nullable = false)
	private User user;
	
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public Long getJob_id() {
		return job_id;
	}
	public void setJob_id(Long job_id) {
		this.job_id = job_id;
	}
	public String getResume_name() {
		return resume_name;
	}
	public void setResume_name(String resume_name) {
		this.resume_name = resume_name;
	}
	public String getResume() {
		return resume;
	}
	public void setResume(String resume) {
		this.resume = resume;
	}
	
	public User getUser() {
		return user;
	}
	public void setUser(User user) {
		this.user = user;
	}
	
	public SentResumes(@NotNull Long job_id, String resume_name, String resume, User user) {
		super();
		this.job_id = job_id;
		this.resume_name = resume_name;
		this.resume = resume;
		this.user = user;
	}
	public SentResumes() {
		super();
	}
	@Override
	public String toString() {
		return "SentResumes [id=" + id + ", job_id=" + job_id + ", resume_name=" + resume_name + ", resume=" + resume
				+ "]";
	}
	
	
	
	
	
}
