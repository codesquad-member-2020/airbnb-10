import styled from "styled-components";

export const Button = styled.button`
  box-sizing: border-box;
  height: 30px;
  font-size: 12px;
  padding: 5px 13px;
  border-radius: 40px;
  border: 1px solid var(--gray-1);
  cursor: pointer;
  box-shadow: var(--box-shadow);
  outline: none;
  margin-right: 5px;

  :hover {
    border: 2px solid var(--black);
    padding: 4px 12px;
  }
`;

export const CountButton = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 1px solid var(--gray-1);
  font-size: 1.5rem;
  outline: none;
  color: var(--gray-1);
  :hover {
    color: var(--black);
  }
`;

export const ToggleWrap = styled.div`
  background-color: #fff;
  border-radius: 5%;
  border: 1px solid var(--gray-1);
  box-shadow: var(--box-shadow);
`;

export const ResetButton = styled.button`
  outline: none;
  text-decoration: underline;
  font-weight: bold;
  cursor: pointer;
`;

export const SaveButton = styled.button`
  outline: none;
  font-size: 0.8rem;
  color: var(--white);
  background-color: var(--black);
  cursor: pointer;
  padding: 7px 10px;
  border-radius: 10px;
  font-weight: bold;
`;

export const DateWarp = styled.div`
  color: var(--black);
  font-weight: bold;
  .DayPickerKeyboardShortcuts_buttonReset {
    display: none;
  }
  .CalendarMonth_table {
    margin-top: 10px;
  }
  .DateRangePickerInput {
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 40px;
    box-shadow: var(--box-shadow);
    margin-right: 5px;
  }
  .DateRangePickerInput__showClearDates {
    padding-right: 0px;
  }
  .DateRangePickerInput_clearDates {
    padding: 0px;
  }
  .DateInput {
    width: 100px;
  }
  .DateInput_input {
    font-size: 12px;
    padding: 0px;
    border-bottom: none;
    width: 80%;
  }
  .DateInput.DateInput_1 {
    border-radius: 40px;
    margin-left: 15px;
  }
  .DateInput.DateInput_1 {
    border-radius: 40px;
  }
  .DateRangePickerInput_arrow_svg {
    display: none;
  }
  .DateRangePickerInput_clearDates_svg {
    vertical-align: inherit;
  }

  .CalendarDay {
    vertical-align: middle;
    position: relative;
    z-index: 0;
    &.CalendarDay__selected {
      background-color: #fff;
      &::before {
        content: "";
        width: 50%;
        height: 100%;
        background-color: #ecf0f1;
        position: absolute;
        top: 0;
        z-index: -2;
      }
      &::after {
        content: "";
        width: 100%;
        height: 100%;
        background-color: #000;
        border-radius: 50%;
        position: absolute;
        top: 0;
        left: 0;
        z-index: -1;
      }
    }
    &.CalendarDay__selected_start {
      &::before {
        right: 0;
      }
    }
    &.CalendarDay__selected_end {
      &::before {
        left: 0;
      }
    }
    &.CalendarDay__hovered_span,
    &.CalendarDay__selected_span {
      background-color: #ecf0f1;
      color: #484848;
      outline: none;
    }
  }
`;
