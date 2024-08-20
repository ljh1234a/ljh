package com.example.ValidationSample2.validator;

import com.example.ValidationSample2.form.CalcForm;
import org.springframework.stereotype.Component;
import org.springframework.validation.Errors;
import org.springframework.validation.Validator;

@Component
public class CalcValidator implements Validator {
    @Override
    public boolean supports(Class<?> clazz) {
        return CalcForm.class.isAssignableFrom(clazz);
    }

    @Override
    public void validate(Object target, Errors errors) {
        CalcForm calcForm = (CalcForm) target;
        if(calcForm.getLeftNum() != null && calcForm.getRightNum() != null) {
            if(!((calcForm.getLeftNum() % 2 == 1) && (calcForm.getRightNum() % 2 == 0))) {
                errors.reject("com.example.ValidatorSample2.validator.CalcValidator.message");
            }
        }
    }
}
