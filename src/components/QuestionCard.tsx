import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Button,
  Typography,
  Stack,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { getAnswers, setUserAnswer } from "../redux/testReducer";
export type testProps = Array<{
  question: string;
  answer: string;
  choices: Array<{
    var: string;
  }>;
}>;

const QuestionCard = () => {
  const [data, setData] = useState<testProps>();
  const [prevIndex, setPrevIndex] = useState(0);
  const [nextIndex, setNextIndex] = useState(1);
  const [result, setResult] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [mistakes, setMistakes] = useState<Array<number>>([]);
  const dispatch = useDispatch();
  const userAnswers = useSelector((state: RootState) => state.test.usersAnswer);
  const correctAnswers = useSelector((state: RootState) => state.test.answers);
  useEffect(() => {
    const fetchData = async () => {
      const testData = await fetch("dummydata.json", {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });

      const response = await testData.json();
      setData(response);
      dispatch(getAnswers(response));
    };

    fetchData();
  }, []);

  const nextButton = () => {
    if (nextIndex !== data?.length) {
      setNextIndex((prev) => prev + 1);
      setPrevIndex((prev) => prev + 1);
    }
  };
  const prevButton = () => {
    if (prevIndex !== 0) {
      setPrevIndex((prev) => prev - 1);
      setNextIndex((prev) => prev - 1);
    }
  };

  const handleAnswer = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(
      setUserAnswer({
        index: prevIndex,
        answer: e.target.value,
      })
    );
  };

  const sumbitHandler = () => {
    for (let i in userAnswers) {
      if (userAnswers[i] === correctAnswers[i]) {
        setResult((prev) => prev + 1);
      } else {
        setMistakes((prev) => [...prev, Number(i) + 1]);
      }
    }
    setShowResults(true);
  };
  const finishHanlder = () => {
    setResult(0);
    setMistakes([]);
    setShowResults(false);
    window.location.reload();
  };
  return (
    <div className="question-card">
      <div
        className="modal-result"
        style={{ display: showResults ? "block" : "none" }}
      >
        <div
          style={{
            width: "100%",
            marginTop: "5rem",
            padding: "2.5rem",
          }}
        >
          <div className="modal-card">
            <Typography variant="h5">Results:</Typography>
            <Typography mt={"0.5rem"}>
              Correct Answered {result}/{userAnswers.length}
            </Typography>
            <Typography variant="h5" mt={"2rem"}>
              Mistakes:
            </Typography>
            <Stack gap={"0.5rem"}>
              {mistakes.length === 0 ? (
                <Typography variant="h6">
                  Congratulations All answers are CORRECT!!!
                </Typography>
              ) : mistakes.length === correctAnswers.length ? (
                <Typography>All Answers are WORNG! TRY AGAIN</Typography>
              ) : (
                mistakes.map((mistake) => (
                  <Typography>Question {mistake}</Typography>
                ))
              )}
            </Stack>
            <div
              style={{
                display: "flex",
                width: "100%",
                justifyContent: "center",
              }}
            >
              <Button
                onClick={finishHanlder}
                sx={{ marginTop: "1rem" }}
                variant="contained"
              >
                Try Again
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="question-wrapper">
        <div>
          {data?.slice(prevIndex, nextIndex).map((quiz) => (
            <>
              <Typography variant="h6">
                {nextIndex}. {quiz.question}
              </Typography>

              <FormControl sx={{ marginTop: "3rem" }}>
                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  name="radio-buttons-group"
                  onChange={handleAnswer}
                >
                  {quiz.choices.map((choice) => (
                    <FormControlLabel
                      checked={choice.var === userAnswers[prevIndex]}
                      value={choice.var}
                      control={<Radio />}
                      label={choice.var}
                    />
                  ))}
                </RadioGroup>
              </FormControl>
            </>
          ))}
        </div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div style={{ display: "flex", columnGap: "1.5rem" }}>
            {
              <Button
                disabled={prevIndex === 0}
                variant="outlined"
                onClick={prevButton}
              >
                Prev
              </Button>
            }
            {nextIndex !== data?.length && (
              <Button variant="outlined" onClick={nextButton}>
                Next
              </Button>
            )}
          </div>
          {nextIndex === data?.length && (
            <Button variant="contained" onClick={sumbitHandler}>
              Submit
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuestionCard;
