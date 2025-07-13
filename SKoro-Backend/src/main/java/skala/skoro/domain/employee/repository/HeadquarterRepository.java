package skala.skoro.domain.employee.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import skala.skoro.domain.employee.entity.Headquarter;

public interface HeadquarterRepository extends JpaRepository<Headquarter, Long> {
}
