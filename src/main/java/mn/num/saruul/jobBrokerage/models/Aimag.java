package mn.num.saruul.jobBrokerage.models;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "aimag")
public class Aimag {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	private String name;
	
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

	public Aimag() {
		super();
		// TODO Auto-generated constructor stub
	}

	public Aimag(String name) {
		super();
		this.name = name;
	}

	@Override
	public String toString() {
		return "Aimag [id=" + id + ", name=" + name + "]";
	}

	
	
	
}
