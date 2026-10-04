# Create workplace messages for MyGreeting

**Import format: 2 · Minimum app version: 1.15.1 · Checked with app version: 1.15.4 · Updated: 3 October 2026**

Create and import workplace-message collections for MyGreeting. Use this guide to prepare a JSON file yourself, with a text editor, or with any tool that can produce JSON. The same field names and scheduling rules apply to every file.

## Start here

1. In SharePoint, edit the page, select MyGreeting and open **Edit properties → Workplace messages**. Create or connect a message list.
2. **Export messages** to keep a backup if the list already contains messages.
3. Copy the working example below into a plain-text file named `workplace-messages.json`. Change its message text, emoji and priority. Keep the complete schedule object.
4. To schedule a message, follow the scheduling recipes and field reference. Review the text, dates, times, time zone and links before importing.
5. Select **Import messages**, choose the `.json` file and read the result. Save/publish the homepage if its list connection changed, then reload the page.

The downloadable Markdown file is this guide. **Import messages accepts JSON, not Markdown.** The app validates the whole collection before adding records. There is no separate import-preview screen; check your file before importing.

## A working first file

This adds one Normal message that is always eligible. Copy it as a complete file. `title` is the message text. An empty `link` means the message is not a link. `id: 0` requests a new item; it does not identify an existing list item to update.

```json
{
  "version": 2,
  "messages": [
    {
      "id": 0,
      "title": "Small steps count. You’ve got this!",
      "enabled": true,
      "priority": "Normal",
      "emoji": "🌱",
      "link": "",
      "newTab": false,
      "schedule": {
        "version": 2,
        "scheduled": false,
        "timeZone": "UTC",
        "timeZoneMode": "viewer",
        "anchor": "2026-10-05",
        "allDay": true,
        "startTime": "09:00",
        "endTime": "17:00",
        "unit": "none",
        "interval": 1,
        "weekdays": [
          1,
          2,
          3,
          4,
          5
        ],
        "pattern": "date",
        "day": 1,
        "ordinal": 1,
        "weekday": 1,
        "month": 1
      }
    }
  ]
}
```

Change `title` to your own sentence and choose an emoji or an empty string. To add more messages, put another complete message object in the `messages` array, separated by a comma. Keep the outer `version` as the number `2`.

### Editing JSON

Use double quotes for names and text, actual booleans (`true` / `false`) and numbers without quotes. JSON does not accept comments, trailing commas, `undefined` or Markdown fences. Save the file as UTF-8 with a `.json` extension.

An optional [JSON Schema](https://lemnitec.github.io/docs/workplace-messages/format-2/message-import.schema.json) provides field descriptions, allowed-value suggestions and structural checks in editors such as Visual Studio Code. Add this property alongside `version` and `messages` to associate your file with it:

```text
"$schema": "https://lemnitec.github.io/docs/workplace-messages/format-2/message-import.schema.json"
```

The `$schema` property is optional and ignored by the importer. The schema describes recommended new collections, including complete unused fields. The app remains the final validator: editor checks cannot establish a valid time zone, date ordering, same-day time ordering or SharePoint permissions. Older exported backups remain accepted by the app.

## What you decide

| Choice | Available options | Suggested starting point |
| --- | --- | --- |
| Message text | Your sentence, up to 255 characters | Keep it short; it appears alongside a personalised greeting. |
| Emoji | One emoji or none | Use an emoji that fits the message. |
| Priority | `Normal` / `Important` | Normal for everyday messages; Important for occasions that should take precedence. |
| Show | Always / Scheduled | Always for general encouragement; Scheduled for occasions and reminders. |
| Whole day | Yes / No | Yes for holidays; No for lunchtime or afternoon reminders. |
| Repeat | Off / every X days, weeks, months or years | Weekly for weekdays; yearly for fixed-date occasions. |
| Repeat pattern | Weekdays / calendar date / first, second, third, fourth or last weekday | Pick the pattern that matches the real event. |
| Series end | No end / an inclusive final date | Leave unset unless the collection should stop. |
| Time zone | Each viewer’s local time / a fixed IANA zone | Viewer-local for local lunch and working hours. |
| Link | None / an actual HTTPS or site-relative destination | Leave empty unless you know the destination. |

**Rotation and priority:** eligible Normal and Important messages are compared by priority. If an Important message is eligible, Normal workplace messages are not selected. Messages at the highest eligible priority rotate on page reload; Always and Scheduled can rotate together. Put two messages at the same priority if you want them to rotate together. There is no automatic timed refresh; an already-open page keeps its selected message until reload.

Birthday, work-anniversary and new-starter greetings use MyGreeting’s personal-moment settings and retain their precedence. The setting for showing a subtitle during personal moments determines whether a workplace message is also visible. Workplace text does not substitute employee-name placeholders such as `{name}`; the greeting itself already provides the employee’s name.

## Time zones: choose the right meaning

- **Viewer-local:** 12:00 means noon in each viewer’s device time zone. People in Amsterdam and New York see the lunch reminder at their own noon. Travel or a device-zone change affects the next page-load selection.
- **Fixed zone:** 12:00 in `Europe/Amsterdam` is one shared time window. Someone in New York sees it at the corresponding local time, not at their own noon.

Set `timeZoneMode` explicitly for new collections. Use `viewer` for the first option and `fixed` for the second. Always include a valid `timeZone` string. With viewer-local schedules, `UTC` is a valid unused placeholder; the device’s time zone controls eligibility. With fixed schedules, use the real zone, for example `Europe/Amsterdam`, `Europe/London`, `America/New_York` or `UTC`. Do not use Windows labels such as `W. Europe Standard Time`, a fixed UTC offset, or abbreviations such as `CET` as your IANA zone choice. Named zones handle daylight-saving changes.

## The file the app accepts

The JSON envelope has two required properties: `version` must be the number `2`, and `messages` must be an array of complete message objects. Use double quotes for strings, real JSON booleans (`true`/`false`), no comments and no trailing commas. A Markdown code fence is not part of a saved JSON file.

Each message needs all the common fields and a complete `schedule`, even when its schedule is Always. Unused schedule fields still need valid values; use the canonical defaults below. Optional fields should be omitted when unused, not filled with `null` or empty date strings.

Do not include `etag` for a new collection. Set `id` to `0`; the importer creates the SharePoint IDs. `instructions` and `chatgptPrompt` are optional top-level metadata, but generated collections should normally contain only `version` and `messages`. Omit `invalidRecords`; a backup with damaged raw records cannot be imported until those records are reviewed and repaired.

### Common fields

| JSON field | Required | Allowed value / meaning |
| --- | --- | --- |
| `id` | Yes | Use the number `0` for generated collections. |
| `title` | Yes | Message text: a nonblank string of 1–255 characters. This is the UI’s Message text field. |
| `enabled` | Yes | `true` or `false`. Use `true` unless requested otherwise. |
| `priority` | Yes | Exactly `Normal` or `Important`; use `Normal` by default. |
| `emoji` | Yes | Emoji string or `""`. Use one emoji; the implementation limit is 32 JavaScript string code units. |
| `link` | Yes | `""`, an HTTPS URL, or a site-relative path starting with one `/`. Maximum 255 characters. No embedded credentials, backslashes or line breaks. Never invent a company destination. |
| `newTab` | Yes | `true` or `false`; default `false`. This is the UI’s Open link in a new tab choice. |
| `schedule` | Yes | A complete object using the fields below. |

### Schedule fields

| JSON field | Required | Allowed value / what to fill in |
| --- | --- | --- |
| `version` | Yes | Number `2`, independently of the envelope’s version. |
| `scheduled` | Yes | `false` for Always; `true` for Scheduled. |
| `timeZoneMode` | Recommended | `viewer` or `fixed`. Omission retains legacy fixed-zone behavior. |
| `timeZone` | Yes | A valid IANA zone. Use `UTC` with `viewer`, or the requested real zone with `fixed`. |
| `anchor` | Yes | A valid `YYYY-MM-DD` date. Set it equal to `start` for a new scheduled rule. For Always, use the collection’s start date as a harmless placeholder. |
| `start` | Optional | First eligible date. Include it for every newly generated scheduled rule. If omitted, `anchor` is the start. |
| `end` | Optional | For `unit: "none"`, the last display date. For recurrence, the inclusive series Until date. Omit for no end date. |
| `allDay` | Yes | `true` for whole days; `false` for a daily clock-time window. |
| `startTime` | Yes | `HH:mm`. Default `09:00` for unused all-day fields; use the real start time when `allDay` is false. |
| `endTime` | Yes | `HH:mm`. Default `17:00` for unused all-day fields. Timed windows include start and exclude end; end must be later on the same day. |
| `unit` | Yes | Exactly `none`, `day`, `week`, `month` or `year`. |
| `interval` | Yes | Integer `1`–`999`. Use `1` for every day/week/month/year and for unused nonrecurring fields. |
| `weekdays` | Yes | Array of integers `0`–`6`; required to be nonempty for weekly recurrence. Default `[1,2,3,4,5]` when unused. |
| `pattern` | Yes | `date` or `weekday`; default `date` when unused. |
| `day` | Yes | Integer `1`–`31`. Used by monthly/yearly date patterns; default `1` when unused. |
| `ordinal` | Yes | `1`, `2`, `3`, `4` or `-1` (last). Used by weekday patterns; default `1` when unused. |
| `weekday` | Yes | Integer `0`–`6`. Used by monthly/yearly weekday patterns; default `1` when unused. |
| `month` | Yes | Integer `1`–`12`. Used by yearly patterns; default `1` when unused. Derive it from the intended start date for yearly rules. |
| `durationDays` | Optional | Inclusive recurring all-day occurrence length: integer `1`–`366`. Omit for a single day, nonrecurring events and timed recurrence. |

**Weekday choices:** Sunday `0`, Monday `1`, Tuesday `2`, Wednesday `3`, Thursday `4`, Friday `5`, Saturday `6`. These numbers are the import representation; the form displays weekday names.

### Canonical unused values

For an Always message, use `scheduled: false`, `allDay: true`, `unit: "none"`, `interval: 1`, `weekdays: [1,2,3,4,5]`, `pattern: "date"`, `day: 1`, `ordinal: 1`, `weekday: 1`, `month: 1`, `startTime: "09:00"`, `endTime: "17:00"`, a valid collection-start `anchor`, `timeZoneMode: "viewer"` and `timeZone: "UTC"`. Omit `start`, `end` and `durationDays`. Keep all common fields, including empty strings for no emoji/link.

For scheduled rules, start with the same complete object, set `scheduled: true`, add `start` and set `anchor` equal to it, then change only the fields needed by the selected recipe. Do not abbreviate the object down to those changed fields.

## Scheduling recipes

| What you want | Fields to change in a complete schedule |
| --- | --- |
| Always | `scheduled: false`; no `start`, `end` or `durationDays`. |
| One specific whole day | `scheduled: true`, `start` and `end` both that date, `unit: "none"`, `allDay: true`. |
| A nonrecurring date range | `start` and `end` bound the inclusive range, `unit: "none"`. With times enabled, the same clock window is tested on every date in that range. |
| Every 2 days | `unit: "day"`, `interval: 2`. The first date anchors the interval. |
| Every Monday | `unit: "week"`, `weekdays: [1]`, `interval: 1`. |
| Monday–Friday lunchtime | `unit: "week"`, `weekdays: [1,2,3,4,5]`, `allDay: false`, real start/end times. |
| Every other week | `unit: "week"`, `interval: 2`, selected weekdays. Weeks run Monday–Sunday and are anchored to the start-date week. |
| On the 24th each month | `unit: "month"`, `pattern: "date"`, `day: 24`. |
| On the last Thursday each month | `unit: "month"`, `pattern: "weekday"`, `ordinal: -1`, `weekday: 4`. |
| On the fourth Thursday each month | Same as above, but `ordinal: 4`. Fourth and last are not always the same occurrence. |
| Every Christmas, 24–26 December | `unit: "year"`, `pattern: "date"`, `month: 12`, `day: 24`, `allDay: true`, `durationDays: 3`. |
| Last Thursday of September each year | `unit: "year"`, `pattern: "weekday"`, `month: 9`, `ordinal: -1`, `weekday: 4`. |
| Repeat through a final date | Add `end` as the inclusive Until date. Omit it for unlimited recurrence. |

Dates must be real calendar dates. Start must not be after end. The 31st clamps to the last day of a shorter month; an annual February 29 rule uses February 28 in non-leap years. There is no fifth-weekday rule; use first/second/third/fourth/last. Timed messages cannot cross midnight. Multi-day recurring all-day messages can span month/year boundaries.

**End of occurrence versus end of series:** for recurring Christmas, `durationDays: 3` means each occurrence is 24–26 December. An `end` date would stop the series itself; it does not define the annual three-day duration. The series cutoff also stops any occurrence that would extend beyond that cutoff.

**One-off versus unbounded:** a scheduled `unit: "none"` message with no `end` stays eligible on every date after its start. For a one-off event, always supply the same start/end date or the intended finite range.

## Holidays, personal events and links

- Fixed-date holidays can use yearly recurrence. Verify local observance rules before choosing the date.
- Movable holidays such as Easter need verified dates for each requested year and finite `unit: "none"` entries. Do not repeat last year’s date annually. Use a confirmed date for the intended country and year.
- Seasons depend on the country/hemisphere and on meteorological versus astronomical definitions. The summer example below uses Northern Hemisphere meteorological summer on 1 June. Do not assume it suits every customer.
- Individual birthdays, employee anniversaries and first-week welcomes belong in MyGreeting’s personal-moment settings. Imported workplace messages are shared among people who can view the connected list, not individually targeted. Generic date-column lookup from another list, audience filters, Outlook-calendar synchronization and per-occurrence exceptions are not supported by this import format.
- Prefer practical, positive messages. Timesheet reminders can be linked, but leave `link` empty until a real destination is supplied. The example collection deliberately has no invented timesheet link.

## Complete example collection

The eight examples demonstrate Always, weekly, timed, yearly, multi-day, last-weekday and one-off schedules. They are illustrative, not a recommendation to import everything. Dates are explicit examples for 2026/2027: change the year/start dates for your collection, remove unwanted examples, set real links, and review priorities. All examples are enabled. The Important Christmas message takes precedence over Normal messages during its eligible days.

```json
{
  "version": 2,
  "messages": [
    {
      "id": 0,
      "title": "Small steps count. You’ve got this!",
      "enabled": true,
      "priority": "Normal",
      "emoji": "🌱",
      "link": "",
      "newTab": false,
      "schedule": {
        "version": 2,
        "scheduled": false,
        "timeZone": "UTC",
        "timeZoneMode": "viewer",
        "anchor": "2026-10-05",
        "allDay": true,
        "startTime": "09:00",
        "endTime": "17:00",
        "unit": "none",
        "interval": 1,
        "weekdays": [
          1,
          2,
          3,
          4,
          5
        ],
        "pattern": "date",
        "day": 1,
        "ordinal": 1,
        "weekday": 1,
        "month": 1
      }
    },
    {
      "id": 0,
      "title": "New week, fresh start. You’ve got this!",
      "enabled": true,
      "priority": "Normal",
      "emoji": "💪",
      "link": "",
      "newTab": false,
      "schedule": {
        "version": 2,
        "scheduled": true,
        "timeZone": "UTC",
        "timeZoneMode": "viewer",
        "anchor": "2026-10-05",
        "allDay": true,
        "startTime": "09:00",
        "endTime": "17:00",
        "unit": "week",
        "interval": 1,
        "weekdays": [
          1
        ],
        "pattern": "date",
        "day": 1,
        "ordinal": 1,
        "weekday": 1,
        "month": 1,
        "start": "2026-10-05"
      }
    },
    {
      "id": 0,
      "title": "It’s lunchtime! Enjoy a well-earned break.",
      "enabled": true,
      "priority": "Normal",
      "emoji": "🍽️",
      "link": "",
      "newTab": false,
      "schedule": {
        "version": 2,
        "scheduled": true,
        "timeZone": "UTC",
        "timeZoneMode": "viewer",
        "anchor": "2026-10-05",
        "allDay": false,
        "startTime": "12:00",
        "endTime": "13:00",
        "unit": "week",
        "interval": 1,
        "weekdays": [
          1,
          2,
          3,
          4,
          5
        ],
        "pattern": "date",
        "day": 1,
        "ordinal": 1,
        "weekday": 1,
        "month": 1,
        "start": "2026-10-05"
      }
    },
    {
      "id": 0,
      "title": "Don’t forget to book your hours!",
      "enabled": true,
      "priority": "Normal",
      "emoji": "⏱️",
      "link": "",
      "newTab": false,
      "schedule": {
        "version": 2,
        "scheduled": true,
        "timeZone": "UTC",
        "timeZoneMode": "viewer",
        "anchor": "2026-10-09",
        "allDay": false,
        "startTime": "15:00",
        "endTime": "17:00",
        "unit": "week",
        "interval": 1,
        "weekdays": [
          5
        ],
        "pattern": "date",
        "day": 1,
        "ordinal": 1,
        "weekday": 1,
        "month": 1,
        "start": "2026-10-09"
      }
    },
    {
      "id": 0,
      "title": "Merry Christmas!",
      "enabled": true,
      "priority": "Important",
      "emoji": "🎄",
      "link": "",
      "newTab": false,
      "schedule": {
        "version": 2,
        "scheduled": true,
        "timeZone": "UTC",
        "timeZoneMode": "viewer",
        "anchor": "2026-12-24",
        "allDay": true,
        "startTime": "09:00",
        "endTime": "17:00",
        "unit": "year",
        "interval": 1,
        "weekdays": [
          1,
          2,
          3,
          4,
          5
        ],
        "pattern": "date",
        "day": 24,
        "ordinal": 1,
        "weekday": 1,
        "month": 12,
        "start": "2026-12-24",
        "durationDays": 3
      }
    },
    {
      "id": 0,
      "title": "It’s finally summer! Time for sunshine and ice cream.",
      "enabled": true,
      "priority": "Normal",
      "emoji": "🍦",
      "link": "",
      "newTab": false,
      "schedule": {
        "version": 2,
        "scheduled": true,
        "timeZone": "UTC",
        "timeZoneMode": "viewer",
        "anchor": "2027-06-01",
        "allDay": true,
        "startTime": "09:00",
        "endTime": "17:00",
        "unit": "year",
        "interval": 1,
        "weekdays": [
          1,
          2,
          3,
          4,
          5
        ],
        "pattern": "date",
        "day": 1,
        "ordinal": 1,
        "weekday": 1,
        "month": 6,
        "start": "2027-06-01"
      }
    },
    {
      "id": 0,
      "title": "Team catch-up today. Bring your ideas!",
      "enabled": true,
      "priority": "Normal",
      "emoji": "💡",
      "link": "",
      "newTab": false,
      "schedule": {
        "version": 2,
        "scheduled": true,
        "timeZone": "UTC",
        "timeZoneMode": "viewer",
        "anchor": "2026-10-29",
        "allDay": true,
        "startTime": "09:00",
        "endTime": "17:00",
        "unit": "month",
        "interval": 1,
        "weekdays": [
          1,
          2,
          3,
          4,
          5
        ],
        "pattern": "weekday",
        "day": 1,
        "ordinal": -1,
        "weekday": 4,
        "month": 1,
        "start": "2026-10-29"
      }
    },
    {
      "id": 0,
      "title": "Team lunch today. See you there!",
      "enabled": true,
      "priority": "Normal",
      "emoji": "🍽️",
      "link": "",
      "newTab": false,
      "schedule": {
        "version": 2,
        "scheduled": true,
        "timeZone": "UTC",
        "timeZoneMode": "viewer",
        "anchor": "2026-10-15",
        "allDay": false,
        "startTime": "12:00",
        "endTime": "13:00",
        "unit": "none",
        "interval": 1,
        "weekdays": [
          1,
          2,
          3,
          4,
          5
        ],
        "pattern": "date",
        "day": 1,
        "ordinal": 1,
        "weekday": 1,
        "month": 1,
        "start": "2026-10-15",
        "end": "2026-10-15"
      }
    }
  ]
}
```

## Before you import

1. Output envelope version `2` and complete message/schedule objects; use `title` for message text and the documented schedule field names.
2. Include every required common and schedule field, with the exact allowed choices and value types. Use actual booleans and numbers.
3. Set `id: 0`, omit `etag`, and do not include damaged backup `invalidRecords`.
4. Verify title/link limits, safe actual links, real calendar dates, the start/end order and same-day time windows.
5. Ensure weekly rules have selected days, monthly/yearly patterns agree with the requested occurrence, and yearly month/day are correct.
6. Keep recurring series `end` omitted unless requested; use `durationDays` for multi-day all-day occurrences.
7. Check time-zone intent, priority effects, movable holidays and the requested country/year.
8. Include only the messages you intend to add. Save one valid `.json` file.

The importer performs its own validation. Review every collection before importing, whichever tool prepared it.

## Troubleshooting

| What you see | What to do |
| --- | --- |
| Invalid JSON / invalid backup | Check the outer `version: 2` and `messages` array. Remove comments, trailing commas and code fences. |
| Incomplete schedule | Copy a complete schedule, including unused required fields. Check exact field names and types against the reference. |
| Invalid recurrence / dates / times | Check real dates, start before end, nonempty weekly days and start time before end time on the same day. |
| Import stops after adding some messages | Read the reported error, resolve permissions or connection problems, then retry the same file. Identical records are skipped. |
| An imported message does not appear | Check Enabled, the schedule and time zone, higher-priority messages and personal moments; reload the page. |
| List setup needs repair | Open web part properties. Repair appears only after the setup check identifies missing columns, form bindings or default-view columns it can restore. |
| List deleted or access denied | Restore/reconnect/create a replacement, or ask for access. Repair cannot restore a deleted list or grant permission. |
| A column has an incompatible type or another form is attached | Ask an administrator to resolve the conflict. Automatic repair does not replace conflicting fields or forms. |

## Import results and recovery

The importer adds messages to the currently connected list; it does not overwrite existing messages. Identical records are skipped, including on a retry after a partial failure. Different wording, priority, link or scheduling settings can create a new record, so importing a revised message does not edit its earlier copy. Review or disable the older item through Manage messages.

Keep JSON files under 2,000,000 bytes and collections to at most 5,000 messages. A malformed file is rejected before records are created. A later SharePoint failure can stop an otherwise-valid import after some records have been added; the result reports progress and a retry skips identical records already imported.

Export existing messages before administrative changes. If the list is missing, restore it from SharePoint’s recycle bin, reconnect the correct list, or explicitly create a replacement and import a backup. Repair can restore missing columns/form setup but cannot reconstruct deleted values without a backup. Do not delete a working list to retry import.

## Version and maintenance

This guide describes format 2 as implemented by MyGreeting 1.15.4, including viewer-local scheduling introduced in 1.15.1. It is a self-contained reference for preparing import files. Future formats must receive a separately identified guide; keep existing-format documentation available for older installations.

Public guide: https://lemnitec.github.io/docs/workplace-messages/format-2/

Lemnitec support: https://lemnitec.github.io/support/
