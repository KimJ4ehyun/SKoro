package skala.skoro.domain.auth.service;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import skala.skoro.domain.auth.dto.CustomUserDetails;
import skala.skoro.domain.employee.entity.Employee;
import skala.skoro.domain.employee.repository.EmployeeRepository;

@Service
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {

    private final EmployeeRepository employeeRepository;

    @Override
    public CustomUserDetails loadUserByUsername(String empNo) throws UsernameNotFoundException {
        Employee employee = employeeRepository.findById(empNo)
                .orElseThrow(() -> new UsernameNotFoundException("존재하지 않는 사번입니다."));
        return new CustomUserDetails(employee);
    }
}
