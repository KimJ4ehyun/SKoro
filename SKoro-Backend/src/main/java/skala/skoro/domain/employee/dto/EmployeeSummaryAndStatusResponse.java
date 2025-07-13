package skala.skoro.domain.employee.dto;

import lombok.*;
import skala.skoro.domain.employee.entity.Employee;
import skala.skoro.domain.evaluation.entity.Status;
import skala.skoro.domain.evaluation.entity.TempEvaluation;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class EmployeeSummaryAndStatusResponse {
    private String empNo;
    private String empName;
    private String profileImage;
    private Status status;

    public static EmployeeSummaryAndStatusResponse of(Employee employee, TempEvaluation tempEvaluation) {
        return EmployeeSummaryAndStatusResponse.builder()
                .empNo(employee.getEmpNo())
                .empName(employee.getEmpName())
                .profileImage(employee.getProfileImage())
                .status(tempEvaluation.getStatus())
                .build();
    }
}
