package mn.num.saruul.jobBrokerage.payload;

import java.util.Date;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

public class ProfileRequest {
	private Long id;
	private String race;
	@NotNull
	private Integer gender;
	private Date birthdate;
	private String familyName;
	
	@NotNull
	private Long birthAimag;
	@NotNull
	private Long birthSum;
	@NotBlank
	private String birthAddress;
	
	@NotNull
	private Long residentAimag;
	@NotNull
	private Long residentSum;
	@NotBlank
	private String residentAddress;
	
	
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	private String givenname;
	private String surname;
	public String getRace() {
		return race;
	}
	public void setRace(String race) {
		this.race = race;
	}
	public Integer getGender() {
		return gender;
	}
	public void setGender(Integer gender) {
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
	public Long getBirthAimag() {
		return birthAimag;
	}
	public void setBirthAimag(Long birthAimag) {
		this.birthAimag = birthAimag;
	}
	public Long getBirthSum() {
		return birthSum;
	}
	public void setBirthSum(Long birthSum) {
		this.birthSum = birthSum;
	}
	public String getBirthAddress() {
		return birthAddress;
	}
	public void setBirthAddress(String birthAddress) {
		this.birthAddress = birthAddress;
	}
	public Long getResidentAimag() {
		return residentAimag;
	}
	public void setResidentAimag(Long residentAimag) {
		this.residentAimag = residentAimag;
	}
	public Long getResidentSum() {
		return residentSum;
	}
	public void setResidentSum(Long residentSum) {
		this.residentSum = residentSum;
	}
	public String getResidentAddress() {
		return residentAddress;
	}
	public void setResidentAddress(String residentAddress) {
		this.residentAddress = residentAddress;
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
	@Override
	public String toString() {
		return "ProfileRequest [race=" + race + ", gender=" + gender + ", birthdate=" + birthdate + ", familyName="
				+ familyName + ", birthAimag=" + birthAimag + ", birthSum=" + birthSum + ", birthAddress="
				+ birthAddress + ", residentAimag=" + residentAimag + ", residentSum=" + residentSum
				+ ", residentAddress=" + residentAddress + ", givenname=" + givenname + ", surname=" + surname + "]";
	}
	
	
	
}
