package mn.num.saruul.jobBrokerage.payload;

import java.io.File;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

public class AddCompanyRequest {
	@NotBlank
	@Size(min = 2, max = 60)
	private String name;
	
	@NotBlank
	@Size(min = 2)
	private String description;
	
	@Size(min = 3)
	private String location;
	
	private File logo;
	
	private Long id;
	
	

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

	public File getLogo() {
		return logo;
	}

	public void setLogo(File logo) {
		this.logo = logo;
	}

	@Override
	public String toString() {
		return "AddCompanyRequest [name=" + name + ", description=" + description + ", location=" + location + ", logo="
				+ logo + "]";
	}
	
	

}
