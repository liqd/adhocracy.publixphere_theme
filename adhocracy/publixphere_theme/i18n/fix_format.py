#!/usr/bin/env python

"""Fox formatting of .po files for easy editing via line based tools (e.g. sed)

-   remove wrapping: msgid and msgstr are each in on single line
-   fill missing msgstr: is msgstr is missing, copy msgid

"""

import sys


MSGID = 'msgid'
MSGID_PLURAL = 'msgid_plural'
MSGSTR = 'msgstr'


def print_block(msgid, msgid_plural, msgstr):
    print('%s "%s"' % (MSGID, msgid))

    if msgid_plural is not None:
        print('%s "%s"' % (MSGID_PLURAL, msgid_plural))

    if len(msgstr) == 1:
        print('%s "%s"' % (MSGSTR, (msgstr[0] if msgstr[0] else msgid)))
    else:
        for i, s in enumerate(msgstr):
            text = s if s else (msgid if i == 0 else msgid_plural)
            print('%s[%i] "%s"' % (MSGSTR, i, text))


def main():
    fn = sys.argv[1]

    with open(fn) as fh:
        msgid = None
        msgid_plural = None
        msgstr = []

        for line in fh:
            line = line.rstrip()

            if line.startswith(MSGID):
                if line.startswith(MSGID_PLURAL):
                    msgid_plural = line[len(MSGID_PLURAL) + 2:-1]
                else:
                    msgid = line[len(MSGID) + 2:-1]

            elif line.startswith(MSGSTR):
                # do not wrap metadata at the beginning of the file
                if msgid == '':
                    msgid = None
                    print('msgid ""')
                    print(line)
                elif line.startswith(MSGSTR + '['):
                    msgstr.append(line[len(MSGSTR) + 5:-1])
                else:
                    msgstr.append(line[len(MSGSTR) + 2:-1])

            elif line.startswith('"'):
                if msgid is None:
                    print(line)
                elif msgstr == []:
                    if msgid_plural is None:
                        msgid += line[1:-1]
                    else:
                        msgid_plural += line[1:-1]
                else:
                    msgstr[-1] += line[1:-1]

            else:
                if msgid is not None:
                    print_block(msgid, msgid_plural, msgstr)
                    msgid = None
                    msgid_plural = None
                    msgstr = []

                print(line)

        if msgid is not None:
            print_block(msgid, msgid_plural, msgstr)


if __name__ == '__main__':
    main()
