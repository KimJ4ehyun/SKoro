package skala.skoro.domain.employee.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import skala.skoro.domain.employee.entity.Team;

public interface TeamRepository extends JpaRepository<Team, Long> {
}
