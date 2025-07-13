package skala.skoro.domain.auth.dto;

import lombok.Builder;
import lombok.Getter;
import skala.skoro.domain.employee.entity.Employee;

@Builder
@Getter
public class EmployeeProfileResponse {
    private String empNo;
    private String empName;
    private String email;
    private String role;
    private Integer cl;
    private String position;
    private String profileImage;
    private String teamName;
    private String headquarterName;
    private String partName;

    public static EmployeeProfileResponse from(Employee employee) {
        return EmployeeProfileResponse.builder()
                .empNo(employee.getEmpNo())
                .empName(employee.getEmpName())
                .email(employee.getEmail())
                .role(employee.getRole().name())
                .cl(employee.getCl())
                .position(employee.getPosition())
                .profileImage(employee.getProfileImage())
                .teamName(employee.getTeam() != null ? employee.getTeam().getTeamName() : null)
                .headquarterName(
                        employee.getTeam() != null && employee.getTeam().getHeadquarter() != null
                                ? employee.getTeam().getHeadquarter().getHeadquarterName()
                                : null)
                .partName(
                        employee.getTeam() != null && employee.getTeam().getHeadquarter() != null &&
                                employee.getTeam().getHeadquarter().getPart() != null
                                ? employee.getTeam().getHeadquarter().getPart().getPartName()
                                : null)
                .build();
    }
}