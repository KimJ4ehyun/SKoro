package skala.skoro.domain.employee.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import skala.skoro.domain.employee.entity.Employee;
import skala.skoro.domain.employee.entity.Team;

import java.util.Collection;
import java.util.List;

public interface EmployeeRepository extends JpaRepository<Employee, String> {
    List<Employee> findByTeam(Team team);

    Employee findByEmpNo(String empNo);
}
