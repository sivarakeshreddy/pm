import json
import os
from pathlib import Path

from backend.app import main as main_module


def test_parse_structured_output() -> None:
    content = json.dumps(
        {
            "reply": "All set.",
            "actions": [
                {
                    "type": "create_card",
                    "columnId": "1",
                    "title": "New card",
                    "details": "Details",
                    "position": 0,
                }
            ],
        }
    )

    parsed = main_module._parse_structured_output(content)
    assert parsed.reply == "All set."
    assert parsed.actions
    assert parsed.actions[0].type == "create_card"


def test_apply_actions_updates_board(tmp_path: Path) -> None:
    os.environ["PM_DB_PATH"] = str(tmp_path / "test.db")
    main_module._init_db()

    conn = main_module._connect_db()
    user_id = main_module._get_or_create_user(conn, "user")
    board = main_module._fetch_board(conn, user_id)

    first_column = board["columns"][0]
    second_column = board["columns"][1]
    first_card_id = board["columns"][0]["cardIds"][0]

    actions = [
        main_module.CreateCardAction(
            type="create_card",
            columnId=first_column["id"],
            title="AI card",
            details="",
            position=0,
        ),
        main_module.MoveCardAction(
            type="move_card",
            cardId=first_card_id,
            columnId=second_column["id"],
            position=0,
        ),
        main_module.UpdateCardAction(
            type="update_card",
            cardId=first_card_id,
            title="Updated title",
        ),
        main_module.DeleteCardAction(
            type="delete_card",
            cardId=first_card_id,
        ),
    ]

    main_module._apply_actions(conn, user_id, actions)
    updated = main_module._fetch_board(conn, user_id)

    assert any(card["title"] == "AI card" for card in updated["cards"].values())
    assert first_card_id not in updated["cards"]
    conn.close()
