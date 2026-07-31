from datetime import date


def calculate_goal_progress(
    target_amount: float,
    current_amount: float,
    target_date=None,
    completed=False,
):

    remaining = target_amount - current_amount

    percentage = 0

    if target_amount > 0:
        percentage = round(
            (current_amount / target_amount) * 100,
            2,
        )

    days_left = None

    if target_date:
        days_left = (target_date - date.today()).days

    if completed:

        status = "completed"

    elif days_left is not None and days_left < 0:

        status = "late"

    else:

        status = "in_progress"

    return {
        "remaining": remaining,
        "percentage": percentage,
        "days_left": days_left,
        "status": status,
    }
