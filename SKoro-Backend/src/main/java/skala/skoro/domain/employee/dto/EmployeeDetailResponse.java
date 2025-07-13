package skala.skoro.domain.employee.dto;

import lombok.*;
import skala.skoro.domain.employee.entity.Employee;
import skala.skoro.domain.employee.entity.Role;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class EmployeeDetailResponse {
    private String empNo;
    private String profileImage;
    private String empName;
    private Role Role;
    private String position;
    private String email;
    private String teamName;

    public static EmployeeDetailResponse from(Employee employee) {
        return EmployeeDetailResponse.builder()
                .empNo(employee.getEmpNo())
                .profileImage(employee.getProfileImage())
                .empName(employee.getEmpName())
                .Role(employee.getRole())
                .position(employee.getPosition())
                .email(employee.getEmail())
                .teamName(employee.getTeam().getTeamName())
                .build();
    }
}
