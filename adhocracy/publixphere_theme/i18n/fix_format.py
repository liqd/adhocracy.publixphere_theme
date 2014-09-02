#!/usr/bin/env python

"""Fox formatting of .po files for easy editing via line based tools (e.g. sed)

-   remove wrapping: msgid and msgstr are each in on single line
-   fill missing msgstr: is msgstr is missing, copy msgid

"""

import sys


MSGSTR = 'msgstr'
MSGID = 'msgid'


def main():
    fn = sys.argv[1]

    with open(fn) as fh:
        msgid = None
        msgstr = None

        for line in fh:
            line = line.rstrip()

            if line.startswith(MSGID):
                msgid = line[len(MSGID) + 1:].strip('"')

            elif line.startswith(MSGSTR):
                # do not wrap metadata at the beginning of the file
                if msgid == '':
                    msgid = None
                    print('msgid ""')
                    print(line)
                else:
                    msgstr = line[len(MSGSTR) + 1:].strip('"')

            elif line.startswith('"'):
                if msgid is None:
                    print(line)
                elif msgstr is None:
                    msgid += line.strip('"')
                else:
                    msgstr += line.strip('"')

            else:
                if msgid is not None:
                    print('msgid "%s"' % msgid)
                    print('msgstr "%s"' % (msgstr if msgstr else msgid))
                    msgid = None
                    msgstr = None

                print(line)


if __name__ == '__main__':
    main()
