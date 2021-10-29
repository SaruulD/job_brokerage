package mn.num.saruul.jobBrokerage.payload;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

public class SignUpRequest {
	@NotBlank
	@Size(min = 2, max = 60)
	private String givenname;
	
	@NotBlank
	@Size(min = 2, max = 60)
	private String surname;
	
	@NotBlank
	@Size(min = 3, max = 15)
	private String username;
	
	@NotBlank
	@Size(max = 40)
	@Email(message = "E-mail")
	private String email;
	
	@NotBlank
	@Size(min = 6, max = 20, message= " minimum length is: 6")
	private String password;
	
	boolean is_owner = false;
	
	@NotNull(message = "Enter your phone number")
	Integer phoneNumber;

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

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public boolean isIs_owner() {
		return is_owner;
	}

	public void setIs_owner(boolean is_owner) {
		this.is_owner = is_owner;
	}

	public Integer getPhoneNumber() {
		return phoneNumber;
	}

	public void setPhoneNumber(Integer phoneNumber) {
		this.phoneNumber = phoneNumber;
	}
}
