package skala.skoro.domain.employee.dto;

import lombok.*;
import skala.skoro.domain.employee.entity.Employee;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class EmployeeSummaryResponse {
    private String empNo;
    private String empName;
    private String profileImage;

    public static EmployeeSummaryResponse from(Employee employee) {
        return EmployeeSummaryResponse.builder()
                .empNo(employee.getEmpNo())
                .empName(employee.getEmpName())
                .profileImage(employee.getProfileImage())
                .build();
    }
}
