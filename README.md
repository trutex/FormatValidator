# FormatValidator
A simple Angular directive for custom validation of form inputs.

##Usage
The following example shows a form with a single input of a reference code, which must have the format "add-dddd-ddd", where '**a**' represents any alpha character, and '**d**' represents any numeric character, e.g. **A12-3456-789**.

If the input doesn't match this format, an error message is shown, and the button on the form is disabled.
```html
<form name="formValidation">
  <input name="reference"
         ng-class="{'input-error': formValidation.reference.$error.format}"
         ng-model="reference"
         format-validator="add-dddd-ddd"
         required />
  <p class="error-message"
     ng-show="formValidation.reference.$error.format">
     Please enter a valid reference
  </p>
  <button type="button"
        ng-click="doSomething"
        ng-disabled = "!formValidation.$valid">
    Submit
  </button>
</form>
```

The `isValidFormat` method in the directive code could easily be extended to cover other format requirements.
