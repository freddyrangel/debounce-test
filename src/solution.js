//Write a React debounce function that takes a string representing last user input and decides when to call the underlying rest service.
//The debounce function could be called repeatedly in quick succession with minor string modifications.
//The underlying REST search call is very expensive and can take as much as 500ms to execute.

function debounce(func, delay = 500) {
  let timeoutId;
  return function (...args) {
    if (timeoutId) clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func(...args);
    }, delay);
  };
}

function testDebounce() {
  let testPassed = true;

  // Test 1: Check if the function is called after the specified delay
  let callCount = 0;
  const increment = () => {
    callCount++;
    console.log("Function called, current call count: ", callCount);
  };

  const debouncedIncrement = debounce(increment, 100);

  debouncedIncrement();
  debouncedIncrement();
  debouncedIncrement();

  setTimeout(() => {
    if (callCount !== 1) {
      console.error(
        "Test 1 Failed: Function was called more than once or not at all",
      );
      testPassed = false;
    } else {
      console.log(
        "Test 1 Passed: Function was called exactly once after delay",
      );
    }
  }, 500);

  // Test 2: Check if the function is not called if the debounce time is reset
  callCount = 0;
  debouncedIncrement();
  setTimeout(debouncedIncrement, 50); // Resetting debounce timer
  setTimeout(debouncedIncrement, 100); // Resetting debounce timer

  setTimeout(() => {
    if (callCount !== 1) {
      console.error(
        "Test 2 Failed: Function was not called exactly once after debounce reset",
      );
      testPassed = false;
    } else {
      console.log(
        "Test 2 Passed: Function was called exactly once after debounce reset",
      );
    }
  }, 250);

  // Test 3: Check if the function is not called before the delay
  callCount = 0;
  debouncedIncrement();

  setTimeout(() => {
    if (callCount !== 0) {
      console.error("Test 3 Failed: Function was called before the delay");
      testPassed = false;
    } else {
      console.log("Test 3 Passed: Function was not called before the delay");
    }
  }, 50);

  // Final result
  setTimeout(() => {
    if (testPassed) {
      console.log("All tests passed.");
    } else {
      console.log("Some tests failed.");
    }
  }, 300);
}

testDebounce();

function submit(query) {
  console.log(`Submitting search for: ${query}`);
}

const inputField = document.getElementById("search-input");

const debouncedSubmit = debounce(submit, 500);

inputField.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    debouncedSubmit(event.target.value);
  }
});
