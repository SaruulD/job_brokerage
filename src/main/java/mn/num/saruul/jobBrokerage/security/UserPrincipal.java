package mn.num.saruul.jobBrokerage.security;

import java.util.Collection;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.fasterxml.jackson.annotation.JsonIgnore;

import mn.num.saruul.jobBrokerage.models.User;

public class UserPrincipal implements UserDetails {
	private static final long serialVersionUID = 1L;
	private Long id;
	private String surname;
	private String givenname;
	private Integer phoneNumber;
	private String username;
	
	@JsonIgnore
	private String password;
	
	@JsonIgnore
	private String email;
	
	private Collection<? extends GrantedAuthority> authorities;


	public UserPrincipal(Long id, String surname, String givenname, Integer phoneNumber, String username,
			String password, String email, Collection<? extends GrantedAuthority> authorities) {
		this.id = id;
		this.surname = surname;
		this.givenname = givenname;
		this.phoneNumber = phoneNumber;
		this.username = username;
		this.password = password;
		this.email = email;
		this.authorities = authorities;
	}
	
	public static UserPrincipal create(User user) {
		List<GrantedAuthority> authorities = user.getRoles().stream().map(role ->
        	new SimpleGrantedAuthority(role.getName().name())
        ).collect(Collectors.toList());
		
		return new UserPrincipal(
				user.getId(),
				user.getSurname(),
				user.getGivenname(),
				user.getPhoneNumber(),
				user.getUsername(),
				user.getPassword(),
				user.getEmail(),
				authorities
		);
	}
	

	public void setAuthorities(Collection<? extends GrantedAuthority> authorities) {
		this.authorities = authorities;
	}

	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		return authorities;
	}

	@Override
	public String getPassword() {
		return password;
	}

	@Override
	public String getUsername() {
		return username;
	}

	@Override
	public boolean isAccountNonExpired() {
		return true;
	}

	@Override
	public boolean isAccountNonLocked() {
		return true;
	}

	@Override
	public boolean isCredentialsNonExpired() {
		return true;
	}

	@Override
	public boolean isEnabled() {
		return true;
	}

	@Override
	public boolean equals(Object o) {
		if (this == o) return true;
		if (o == null || getClass() != o.getClass()) return false;
		UserPrincipal that = (UserPrincipal) o;
		return Objects.equals(this.id, that.id);
	}
	
	
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	@Override
	public int hashCode() {
		return Objects.hash(id);
	}

	public String getSurname() {
		return surname;
	}

	public void setSurname(String surname) {
		this.surname = surname;
	}

	public String getGivenname() {
		return givenname;
	}

	public void setGivenname(String givenname) {
		this.givenname = givenname;
	}

	public Integer getPhoneNumber() {
		return phoneNumber;
	}

	public void setPhoneNumber(Integer phoneNumber) {
		this.phoneNumber = phoneNumber;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public void setPassword(String password) {
		this.password = password;
	}
	
}
