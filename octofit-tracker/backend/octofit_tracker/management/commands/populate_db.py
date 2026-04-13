from django.core.management.base import BaseCommand
from octofit_tracker.models import User, Team, Activity, Workout, Leaderboard
from django.utils import timezone

class Command(BaseCommand):
    help = 'Populate the octofit_db database with test data'

    def handle(self, *args, **options):
        # Temizle
        Leaderboard.objects.all().delete()
        Activity.objects.all().delete()
        Workout.objects.all().delete()
        User.objects.all().delete()
        Team.objects.all().delete()

        # Takımlar
        marvel = Team.objects.create(name='marvel', description='Marvel Team')
        dc = Team.objects.create(name='dc', description='DC Team')

        # Kullanıcılar
        users = [
            User.objects.create(email='ironman@marvel.com', name='Iron Man', team_name='marvel'),
            User.objects.create(email='captain@marvel.com', name='Captain America', team_name='marvel'),
            User.objects.create(email='batman@dc.com', name='Batman', team_name='dc'),
            User.objects.create(email='superman@dc.com', name='Superman', team_name='dc'),
        ]

        # Aktiviteler
        Activity.objects.create(user_email=users[0].email, type='run', duration=30, date=timezone.now().date())
        Activity.objects.create(user_email=users[1].email, type='cycle', duration=45, date=timezone.now().date())
        Activity.objects.create(user_email=users[2].email, type='swim', duration=25, date=timezone.now().date())
        Activity.objects.create(user_email=users[3].email, type='walk', duration=60, date=timezone.now().date())

        # Antrenmanlar
        Workout.objects.create(name='Pushups', description='Do 20 pushups', suggested_for='marvel')
        Workout.objects.create(name='Situps', description='Do 30 situps', suggested_for='dc')

        # Leaderboard
        Leaderboard.objects.create(user_email=users[0].email, points=120, rank=1)
        Leaderboard.objects.create(user_email=users[1].email, points=110, rank=2)
        Leaderboard.objects.create(user_email=users[2].email, points=100, rank=3)
        Leaderboard.objects.create(user_email=users[3].email, points=90, rank=4)

        self.stdout.write(self.style.SUCCESS('Test data populated successfully!'))
