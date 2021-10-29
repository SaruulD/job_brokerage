package mn.num.saruul.jobBrokerage.repos;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import mn.num.saruul.jobBrokerage.models.Role;
import mn.num.saruul.jobBrokerage.models.RoleName;

@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {
    Optional<Role> findByName(RoleName roleName);
}