package mn.num.saruul.jobBrokerage.models;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name = "sum")
public class Sum {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	private String name;
	
	@ManyToOne
	@JoinColumn(name="aimag_id", nullable = false)
	private Aimag aimag;
	
	public Aimag getAimag() {
		return aimag;
	}

	public void setAimag(Aimag aimag) {
		this.aimag = aimag;
	}
	
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

	@Override
	public String toString() {
		return "Sum [id=" + id + ", name=" + name + ", aimag=" + aimag + "]";
	}

	
	
	
}
