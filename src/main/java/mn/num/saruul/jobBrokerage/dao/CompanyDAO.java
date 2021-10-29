package mn.num.saruul.jobBrokerage.dao;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import mn.num.saruul.jobBrokerage.models.Company;
import mn.num.saruul.jobBrokerage.repos.CompanyRepository;

@Repository
@Transactional
public class CompanyDAO {
	
	@Autowired
	CompanyRepository companyRepository;
	
	public void saveOrUpdateCompany(Company company) {
		companyRepository.save(company);
	}
}
