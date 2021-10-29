package mn.num.saruul.jobBrokerage.repos;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import mn.num.saruul.jobBrokerage.models.Company;

@Repository
public interface CompanyRepository extends JpaRepository<Company, Long>, PagingAndSortingRepository<Company, Long>{
    Boolean existsByName(String name);
    
//    @Query(value="SELECT NEW mn.num.saruul.jobBrokerage.payload.CompanyPayload(c.id, c.name) FROM Company c WHERE c.user.id = :userId")
    @Query("SELECT c FROM Company c WHERE c.user.id = :userId")
    List<Company> findCompanyByUserId(@Param("userId") Long userId);
    
    Optional<Company> findByid(Long companyId);
    
    @Query("SELECT c FROM Company c WHERE (:searchText is null or c.name LIKE %:searchText%)")
	Page<Company> searchCompanies(@Param("searchText") String searchText, Pageable pageable);
    
    @Query(value="SELECT COUNT(*) FROM sent_resumes s INNER JOIN jobs j ON j.id = s.job_id INNER JOIN companies c ON c.id = j.company_id WHERE j.company_id = :companyId", nativeQuery = true)
    Integer findCompanyResume(Long companyId);
    
    @Query(value="SELECT COUNT(*) FROM company_moderators c WHERE company_id=:companyId AND user_id=:userId", nativeQuery = true)
    Integer existsModerator(Long companyId, Long userId);
    
    @Query(value="SELECT * FROM company_moderators c INNER JOIN users u ON u.id = c.user_id WHERE company_id=:companyId", nativeQuery = true)
    List<?> getModerators(Long companyId);
    
    @Modifying
    @Query(value="DELETE FROM company_moderators c WHERE user_id = :userId AND company_id = :companyId", nativeQuery = true)
    void removeModerator(Long userId, Long companyId);
    
    @Query(value="SELECT c FROM Company c INNER JOIN Job j ON j.company.id = c.id WHERE j.id = :jobId")
    Optional<Company> findCompanyByJob(Long jobId);
    
    
}
 