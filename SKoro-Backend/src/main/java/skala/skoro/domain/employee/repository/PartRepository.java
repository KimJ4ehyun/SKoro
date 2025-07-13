package skala.skoro.domain.employee.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import skala.skoro.domain.employee.entity.Part;

public interface PartRepository extends JpaRepository<Part, Long> {
}
