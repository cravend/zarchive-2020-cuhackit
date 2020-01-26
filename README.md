# CUhackIt 2020 Submission &mdash; [ReMedic](https://devpost.com/software/remedic)

## Inspiration

The state of the art "technology" for taking your medicine is a little rectangular container that hangs out in your bathroom. It's easy to forget to take your medicine if you're traveling or running low. Wouldn't it be great if there was an app for that?

## What We Do

ReMedic was designed to help people who are not in the routine of taking daily or weekly medicines. Our app helps build healthy habits and ensure that all dosages are properly handled.

## How We Built It

We used Next.js on the front, a PostgreSQL database, and a custom Python REST API to transmit between the two.

## Challenges We Ran Into

Python C-extensions and AWS Lambda do _not_ play well together. We ended up pivoting away from lambda late in the event, instead deciding to run everything locally.

## Accomplishments We Are Proud Of

On the back-end, we wrote a lot of SQL that actually works! We also translated a fairly complicated deduplicated schema into a JSON format that was easy to use and parse. On the front-end, we used several cutting edge web development technologies (including Next, Sass, and CSS Modules) to create an easy-to-navigate application.

## What We Learned

`SELECT exists(count(*))` is _not_ the same as `SELECT count(*) > 0`.

## What's next for ReMedic

We would like to add functionality to ReMedic that would make it even more useful for our users. Some ideas we have on our roadmap are:

- allowing doctors to send a prescription via the app.
- adding functionality characteristic of a Progressive Web App (i.e. offline loading).
- sending dosage reminders via email or push notification.
