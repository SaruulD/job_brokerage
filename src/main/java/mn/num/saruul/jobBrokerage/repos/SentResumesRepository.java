package mn.num.saruul.jobBrokerage.repos;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import mn.num.saruul.jobBrokerage.models.SentResumes;

@Repository
public interface SentResumesRepository extends JpaRepository<SentResumes, Long> {

}
