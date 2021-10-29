package mn.num.saruul.jobBrokerage.models;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "jobType")
public class JobType {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;
	private String name;
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
}


//INSERT INTO `jobbrokerage`.`job_type` (`id`, `name`) VALUES ('1', 'Бүтэн цагийн');
//INSERT INTO `jobbrokerage`.`job_type` (`id`, `name`) VALUES ('2', 'Цагийн');
//INSERT INTO `jobbrokerage`.`job_type` (`id`, `name`) VALUES ('3', 'Ээлжийн');
//INSERT INTO `jobbrokerage`.`job_type` (`id`, `name`) VALUES ('4', 'Гэрээт');
//INSERT INTO `jobbrokerage`.`job_type` (`id`, `name`) VALUES ('5', 'Улирлын');

//INSERT INTO `jobbrokerage`.`job_category` (`id`, `name`) VALUES ('1', 'Автомашин засвар үйлчилгээ');
//INSERT INTO `jobbrokerage`.`job_category` (`id`, `name`) VALUES ('2', 'Аялал жуулчлал, зочид буудал');
//INSERT INTO `jobbrokerage`.`job_category` (`id`, `name`) VALUES ('3', 'Банк санхүү, эдийн засаг');
//INSERT INTO `jobbrokerage`.`job_category` (`id`, `name`) VALUES ('4', 'Барилгын ажил');
//INSERT INTO `jobbrokerage`.`job_category` (`id`, `name`) VALUES ('5', 'Боловсрол, шинжлэх ухаан');
//INSERT INTO `jobbrokerage`.`job_category` (`id`, `name`) VALUES ('6', 'Гоо сайхан, фитнес');
//INSERT INTO `jobbrokerage`.`job_category` (`id`, `name`) VALUES ('7', 'Гүйцэтгэх удирдлага');
//INSERT INTO `jobbrokerage`.`job_category` (`id`, `name`) VALUES ('8', 'Дизайн, энтертайнмент');
//INSERT INTO `jobbrokerage`.`job_category` (`id`, `name`) VALUES ('9', 'Жолооч, оператор');
//INSERT INTO `jobbrokerage`.`job_category` (`id`, `name`) VALUES ('10', 'Инженер, технологич');
//INSERT INTO `jobbrokerage`.`job_category` (`id`, `name`) VALUES ('11', 'Маркетинг, менежмент, PR');
//INSERT INTO `jobbrokerage`.`job_category` (`id`, `name`) VALUES ('12', 'Мэдээллийн технологи');
//INSERT INTO `jobbrokerage`.`job_category` (`id`, `name`) VALUES ('13', 'Оёдолчин, эсгүүрчин');
//INSERT INTO `jobbrokerage`.`job_category` (`id`, `name`) VALUES ('14', 'Ресторан, тогооч, зөөгч');
//INSERT INTO `jobbrokerage`.`job_category` (`id`, `name`) VALUES ('15', 'Төрийн болон төрийн бус байгууллага');
//INSERT INTO `jobbrokerage`.`job_category` (`id`, `name`) VALUES ('16', 'Харуул хамгаалалт');
//INSERT INTO `jobbrokerage`.`job_category` (`id`, `name`) VALUES ('17', 'Хөдөө аж ахуй');
//INSERT INTO `jobbrokerage`.`job_category` (`id`, `name`) VALUES ('18', 'Худалдагч, касс');
//INSERT INTO `jobbrokerage`.`job_category` (`id`, `name`) VALUES ('19', 'Хуульч, хуулийн үйлчилгээ');
//INSERT INTO `jobbrokerage`.`job_category` (`id`, `name`) VALUES ('20', 'Хүний нөөц');
//INSERT INTO `jobbrokerage`.`job_category` (`id`, `name`) VALUES ('21', 'Хэвлэл мэдээлэл');
//INSERT INTO `jobbrokerage`.`job_category` (`id`, `name`) VALUES ('22', 'Эрүүл мэнд, эм зүй');




//INSERT INTO `jobbrokerage`.`roles` (`id`, `name`) VALUES ('2', 'ROLE_MODERATOR');
//INSERT INTO `jobbrokerage`.`roles` (`id`, `name`) VALUES ('3', 'ROLE_OWNER');
//INSERT INTO `jobbrokerage`.`roles` (`id`, `name`) VALUES ('1', 'ROLE_USER');
//INSERT INTO `jobbrokerage`.`roles` (`id`, `name`) VALUES ('4', 'ROLE_ADMIN');

