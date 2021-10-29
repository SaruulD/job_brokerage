package mn.num.saruul.jobBrokerage.models;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "languages", uniqueConstraints = {
        @UniqueConstraint(columnNames = {
                "name",
                "user_id"
        })
})
public class Language {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@ManyToOne
	@JoinColumn(name = "user_id", nullable = false)
	@JsonIgnore
	private User user;
	
	private String name;
	private Integer listening;
	private Integer speaking;
	private Integer reading;
	private Integer writing;
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public User getUser() {
		return user;
	}
	public void setUser(User user) {
		this.user = user;
	}
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
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	@Override
	public String toString() {
		return "Language [id=" + id + ", user=" + user + ", name=" + name + ", listening=" + listening + ", speaking="
				+ speaking + ", reading=" + reading + ", writing=" + writing + "]";
	}
	
	
}
