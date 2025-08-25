from rest_framework import viewsets,status
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import action
from rest_framework.response import Response

import subprocess,os,tempfile,json

from .models import SubmissionModel
from .serializers import SubmissionSerializer

class SubmissionViewSet(viewsets.ModelViewSet):
    queryset = SubmissionModel.objects.all()
    serializer_class = SubmissionSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self,serializer):
        serializer.save(user = self.request.user)

    @action(detail=True,methods=['post'],url_path='run')
    def run_submission(self, request, pk=None):
        submission = self.get_object()
        code = submission.code
        problem = submission.problem

        testcases = problem.testcase
        results = []

        for tc in testcases:
            inp = tc.get("input", "")
            expected = tc.get("expected_output", "")

            with tempfile.NamedTemporaryFile(delete=False, suffix=".py") as tmp:
                tmp.write(code.encode())
                tmp.flush()
                tmp_name = tmp.name

            try:
                completed = subprocess.run(
                    ['python', tmp_name],
                    input=inp.encode(),
                    stdout=subprocess.PIPE,
                    stderr=subprocess.PIPE,
                    timeout=5
                )
                output = completed.stdout.decode().strip()
                error = completed.stderr.decode().strip()
                passed = (output == expected.strip())

                results.append({
                    "input": inp,
                    "expected": expected,
                    "output": output,
                    "error": error,
                    "passed": passed
                })

            except subprocess.TimeoutExpired:
                results.append({
                    "input": inp,
                    "expected": expected,
                    "output": "Timeout",
                    "error": "",
                    "passed": False
                })
            finally:
                os.unlink(tmp_name)
            submission.status = "Accepted" if all(r['passed'] for r in results) else "Failed"
            submission.save()

            return Response({"results": results, "status": submission.status}, status=status.HTTP_200_OK)
        

