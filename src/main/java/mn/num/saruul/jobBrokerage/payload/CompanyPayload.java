package mn.num.saruul.jobBrokerage.payload;

public class CompanyPayload {
	private Long id;
	private String name;
	private Integer received_cv;
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
	public Integer getReceived_cv() {
		return received_cv;
	}
	public void setReceived_cv(Integer received_cv) {
		this.received_cv = received_cv;
	}
	public CompanyPayload() {
		super();
		// TODO Auto-generated constructor stub
	}
	public CompanyPayload(Long id, String name) {
		super();
		this.id = id;
		this.name = name;
	}
	
	
}
