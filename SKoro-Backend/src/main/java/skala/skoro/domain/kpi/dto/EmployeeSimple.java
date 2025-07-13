package skala.skoro.domain.kpi.dto;

import lombok.*;
import skala.skoro.domain.employee.entity.Employee;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class EmployeeSimple {
    private String empNo;
    private String empName;
    private String profileImage;

    public static EmployeeSimple from(Employee employee) {
        return EmployeeSimple.builder()
                .empNo(employee.getEmpNo())
                .empName(employee.getEmpName())
                .profileImage(employee.getProfileImage())
                .build();
    }
}
