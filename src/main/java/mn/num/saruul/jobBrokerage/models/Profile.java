package mn.num.saruul.jobBrokerage.models;

import java.util.Date;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "profile")
public class Profile {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	Long id;
	
	@OneToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", referencedColumnName = "id")
	@JsonIgnore
    private User user;
	
	private String race;
	private Boolean gender;

	@JsonFormat(pattern="yyyy-MM-dd")
	private Date birthdate;
	private String familyName;
	
	@ManyToOne
	@JoinColumn(name = "birth_aimag", nullable = false)
	private Aimag birthAimag;

	@ManyToOne
	@JoinColumn(name = "birth_sum", nullable = false)
	private Sum birthSum;
	private String birthAddress;

	@ManyToOne
	@JoinColumn(name = "resident_aimag", nullable = false)
	private Aimag residentAimag;

	@ManyToOne
	@JoinColumn(name = "resident_sum", nullable = false)
	private Sum residentSum;
	private String residentAddress;
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
	public String getRace() {
		return race;
	}
	public void setRace(String race) {
		this.race = race;
	}
	public Boolean getGender() {
		return gender;
	}
	public void setGender(Boolean gender) {
		this.gender = gender;
	}
	public Date getBirthdate() {
		return birthdate;
	}
	public void setBirthdate(Date birthdate) {
		this.birthdate = birthdate;
	}
	public String getFamilyName() {
		return familyName;
	}
	public void setFamilyName(String familyName) {
		this.familyName = familyName;
	}
	public Aimag getBirthAimag() {
		return birthAimag;
	}
	public void setBirthAimag(Aimag birthAimag) {
		this.birthAimag = birthAimag;
	}
	public Sum getBirthSum() {
		return birthSum;
	}
	public void setBirthSum(Sum birthSum) {
		this.birthSum = birthSum;
	}
	public String getBirthAddress() {
		return birthAddress;
	}
	public void setBirthAddress(String birthAddress) {
		this.birthAddress = birthAddress;
	}
	public Aimag getResidentAimag() {
		return residentAimag;
	}
	public void setResidentAimag(Aimag residentAimag) {
		this.residentAimag = residentAimag;
	}
	public Sum getResidentSum() {
		return residentSum;
	}
	public void setResidentSum(Sum residentSum) {
		this.residentSum = residentSum;
	}
	public String getResidentAddress() {
		return residentAddress;
	}
	public void setResidentAddress(String residentAddress) {
		this.residentAddress = residentAddress;
	}
	public Profile(String race, Date birthdate, String familyName, Aimag birthAimag, Sum birthSum, String birthAddress,
			Aimag residentAimag, Sum residentSum, String residentAddress) {
		super();
		this.race = race;
		this.birthdate = birthdate;
		this.familyName = familyName;
		this.birthAimag = birthAimag;
		this.birthSum = birthSum;
		this.birthAddress = birthAddress;
		this.residentAimag = residentAimag;
		this.residentSum = residentSum;
		this.residentAddress = residentAddress;
	}
	public Profile() {
		super();
		// TODO Auto-generated constructor stub
	}
	
}
