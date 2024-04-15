$(document).ready(function () {
    validateFields();

    $('#form').submit(function (e) {
        e.preventDefault();
        e.stopPropagation();


        const income = $('#grossIncome').val();
        const extraIncome = $('#extraIncome').val();
        const age = $('#age').val();
        const deductions = $('#deductions').val();
        let overallIncome = parseInt(income) + parseInt(extraIncome) - parseInt(deductions);

        if (form[0].checkValidity() === false) {
            form.addClass('was-validated');
        } else {
            let tax = calculateTax(age, overallIncome);
            let incomeAfterTax = overallIncome - tax;
            $("#incomeAfterTax").text(incomeAfterTax);
            $("#taxModal").modal('show');
            console.log('final income: ' + incomeAfterTax);
        }


    });

    function validateFields() {
        $('#grossIncome').on('input', function () {
            var input = $(this);
            if (input.val() !== '' && !$.isNumeric(input.val())) {
                input.addClass('is-invalid');
                input.removeClass('is-valid');
                $("#submit-btn").prop('disabled', true);
            } else {
                input.removeClass('is-invalid');
                input.addClass('is-valid');
                $("#submit-btn").prop('disabled', false);
            }
        });

        $('#extraIncome').on('input', function () {
            var input = $(this);
            if (input.val() !== '' && !$.isNumeric(input.val())) {
                input.addClass('is-invalid');
                input.removeClass('is-valid');
                $("#submit-btn").prop('disabled', true);
            }
            else {
                input.removeClass('is-invalid');
                input.addClass('is-valid');
                $("#submit-btn").prop('disabled', false);
            }
        });

        $('#age').on('input', function () {
            var input = $(this);
            if (input.val() !== '' && !$.isNumeric(input.val()) && input.val() < 0) {
                input.addClass('is-invalid');
                input.removeClass('is-valid');
                $("#submit-btn").prop('disabled', true);
            }
            else {
                input.removeClass('is-invalid');
                input.addClass('is-valid');
                $("#submit-btn").prop('disabled', false);
            }
        });

        $('#deductions').on('input', function () {
            var input = $(this);
            if (input.val() !== '' && !$.isNumeric(input.val())) {
                input.addClass('is-invalid');
                input.removeClass('is-valid');
                $("#submit-btn").prop('disabled', true);
            }
            else {
                input.removeClass('is-invalid');
                input.addClass('is-valid');
                $("#submit-btn").prop('disabled', false);
            }
        });

    }


    function calculateTax(age, overallIncome) {
        let tax = 0;

        if (overallIncome <= 800000) {
            tax = 0;
            console.log('Tax: ' + tax);
            return tax;
        } else {
            tax = (overallIncome - 800000) * taxRate(age);
            console.log('Tax: ' + tax);
            return tax;
        }
    }

    function taxRate(age) {
        if (age < 40) {
            return 0.3;
        } else if (age >= 40 && age < 60) {
            return 0.4;
        } else if (age >= 60) {
            return 0.1;
        } else {
            return 0;
        }
    }

})