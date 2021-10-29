package mn.num.saruul.jobBrokerage.models;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name = "job_histories")
public class JobHistory {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@ManyToOne
	@JoinTable(name = "user_job_histories",
	    joinColumns = @JoinColumn(name = "job_history_id"),
	    inverseJoinColumns = @JoinColumn(name = "user_id"))
	private User user;
	
	
	private Integer listening;
	private Integer speaking;
	private Integer reading;
	private Integer writing;
	public Integer getListening() {
		return listening;
	}
	public void setListening(Integer listening) {
		this.listening = listening;
	}
	public Integer getSpeaking() {
		return speaking;
	}
	public void setSpeaking(Integer speaking) {
		this.speaking = speaking;
	}
	public Integer getReading() {
		return reading;
	}
	public void setReading(Integer reading) {
		this.reading = reading;
	}
	public Integer getWriting() {
		return writing;
	}
	public void setWriting(Integer writing) {
		this.writing = writing;
	}
	public User getUser() {
		return user;
	}
	public void setUser(User user) {
		this.user = user;
	}
}
