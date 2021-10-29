package mn.num.saruul.jobBrokerage.payload;

import java.util.HashSet;
import java.util.Set;

public class JwtAuthenticationResponse {
	private String accessToken;
	private String tokenType = "Bearer";
	private Set<Long> roles=new HashSet<Long>();
	
	public void addElementToRoles(Long idx) {
		this.roles.add(idx);
	}
	
	public JwtAuthenticationResponse(String accessToken) {
		this.accessToken = accessToken;
	}
	public String getAccessToken() {
		return accessToken;
	}
	public void setAccessToken(String accessToken) {
		this.accessToken = accessToken;
	}
	public String getTokenType() {
		return tokenType;
	}
	public void setTokenType(String tokenType) {
		this.tokenType = tokenType;
	}

	public Set<Long> getRoles() {
		return roles;
	}

	public void setRoles(Set<Long> roles) {
		this.roles = roles;
	}
	
	
}
