from django.test import TestCase
from .models import User, Team, Activity, Workout, Leaderboard

class BasicModelTest(TestCase):
    def test_user_creation(self):
        user = User.objects.create(email='test@example.com', name='Test User', team='marvel')
        self.assertEqual(user.email, 'test@example.com')
    def test_team_creation(self):
        team = Team.objects.create(name='marvel', description='Marvel Team')
        self.assertEqual(team.name, 'marvel')
    def test_activity_creation(self):
        user = User.objects.create(email='test2@example.com', name='Test2', team='dc')
        activity = Activity.objects.create(user=user, type='run', duration=30, date='2023-01-01')
        self.assertEqual(activity.type, 'run')
    def test_workout_creation(self):
        workout = Workout.objects.create(name='Pushups', description='Do 20 pushups', suggested_for='marvel')
        self.assertEqual(workout.name, 'Pushups')
    def test_leaderboard_creation(self):
        user = User.objects.create(email='test3@example.com', name='Test3', team='marvel')
        lb = Leaderboard.objects.create(user=user, points=100, rank=1)
        self.assertEqual(lb.rank, 1)
