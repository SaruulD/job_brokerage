package mn.num.saruul.jobBrokerage.models;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import mn.num.saruul.jobBrokerage.models.audit.DateAudit;

@Entity
@Table(name = "resumes")
public class Resume extends DateAudit {
	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	Long id;
	
	@ManyToOne
	@JoinColumn(name="user_id", nullable = false)
	private User user; 
	
	private String name;
	
//	@Lob
	private String resume;

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	
	public String getResume() {
		return resume;
	}

	public void setResume(String resume) {
		this.resume = resume;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Resume() {
		
	}

	@Override
	public String toString() {
		return "Resume [id=" + id + ", user=" + user + ", name=" + name + ", resume=" + resume + "]";
	}

	
}
