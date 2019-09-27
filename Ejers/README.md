# serverless-course-sep19

Ejercicios del curso de serverless realizado en Septiembre de 2019

---

Obtener programaticamente la URL del API Gateway asociado a la función.

aws cloudformation --region eu-west-1 describe-stacks --stack-name gettogether-devvgaltes --profile serverless-local --query "Stacks[0].Outputs[?OutputKey=='ServiceEndpoint'].OutputValue" --output text